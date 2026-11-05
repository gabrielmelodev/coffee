'use client';
import { useCallback, useEffect, useState } from 'react';
import { estado } from '../lib/timeline';
import { PREPARO_REAL_MIN } from '../lib/loja';

export default function useLiveOrder() {
  const [pedido, setPedido] = useState(null);
  const [offset, setOffset] = useState(0); // relógio do servidor - relógio local
  const [, setTick] = useState(0);

  useEffect(() => {
    let vivo = true;
    const carregar = async () => {
      try {
        const d = await (await fetch('/api/pedido', { cache: 'no-store' })).json();
        if (!vivo) return;
        setPedido(d.pedido);
        setOffset(d.now - Date.now());
      } catch {}
    };
    carregar();
    const i = setInterval(carregar, 2000);
    return () => { vivo = false; clearInterval(i); };
  }, []);

  const agora = Date.now() + offset;
  const ms = pedido ? agora - pedido.startedAt : 0;
  const s = pedido ? estado(ms, pedido.tempos) : { stage: -1, p: 0, f: 0 };

  useEffect(() => {
    if (!pedido || s.stage >= 3) return;
    let raf;
    const loop = () => { setTick((t) => t + 1); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pedido, s.stage >= 3]);

  const enviar = useCallback(async (corpo) => {
    const d = await (await fetch('/api/pedido', { method: 'POST', body: JSON.stringify(corpo) })).json();
    setPedido(d.pedido);
    setOffset(d.now - Date.now());
  }, []);

  // Estimativas em minutos "de verdade", mesmo quando a animação está acelerada.
  const dur = pedido?.rota?.durMin ?? 10;
  const km = pedido?.rota?.km ?? 0;
  const faltaPreparo = pedido ? Math.max(0, 1 - ms / (pedido.tempos?.saiu || 1)) : 0;
  const eta = !pedido ? 0
    : s.stage === 3 ? 0
    : s.stage === 2 ? Math.max(1, Math.ceil((1 - s.p) * dur))
    : Math.ceil(dur + PREPARO_REAL_MIN * faltaPreparo);
  const kmRestante = pedido ? (1 - s.p) * km : 0;
  const chegada = pedido && s.stage < 3 ? new Date(agora + eta * 60000) : null;

  return { pedido, stage: s.stage, p: s.p, eta, kmRestante, chegada, enviar };
}

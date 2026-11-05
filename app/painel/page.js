'use client';
import { useEffect, useState } from 'react';
import useLiveOrder from '../../components/useLiveOrder';
import RouteMap from '../../components/RouteMap';
import OrderStatus from '../../components/OrderStatus';
import { DESTINO_DEMO } from '../../lib/loja';
import { fmtKm } from '../../lib/timeline';

export default function Painel() {
  const { pedido, stage, p, eta, kmRestante, chegada } = useLiveOrder();
  const [origem, setOrigem] = useState('');
  useEffect(() => setOrigem(window.location.origin), []);

  return (
    <main className="min-h-screen bg-espresso p-5 text-paper md:p-10">
      <header className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-display text-3xl md:text-4xl">Coffee & Books · pedidos ao vivo</h1>
        <p className="text-latte">Peça pelo celular em <span className="font-medium text-paper">{origem || '…'}</span></p>
      </header>

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="relative overflow-hidden rounded-lg bg-paper p-6 text-ink">
          {pedido ? (
            <OrderStatus pedido={pedido} stage={stage} eta={eta} kmRestante={kmRestante} chegada={chegada} mostrarItens />
          ) : (
            <>
              <h2 className="font-display text-2xl">Aguardando pedido</h2>
              <p className="mt-2 text-caramel">Abra o site, vá até a seção de delivery e faça um pedido. Ele aparece aqui na hora, com o motoboy no mapa.</p>
            </>
          )}
        </div>
        <div className="overflow-hidden rounded-lg bg-paper">
          <RouteMap stage={pedido ? stage : -1} p={pedido ? p : 0} destino={pedido?.destino ?? DESTINO_DEMO} coords={pedido?.rota?.coords} legenda={pedido && stage === 2 ? `${pedido.motoboy?.nome ?? 'Motoboy'} · a ${fmtKm(kmRestante)} · ${eta} min` : null} />
        </div>
      </div>
    </main>
  );
}

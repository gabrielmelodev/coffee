import { MODO_TEMPO, PREPARO_REAL_MIN } from './loja';

export const STEPS = ['Pedido recebido', 'Em preparo', 'Saiu para entrega', 'Entregue'];
export const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const fmtKm = (k) =>
  k < 1 ? `${Math.max(10, Math.round((k * 1000) / 10) * 10)} m` : `${k.toFixed(1).replace('.', ',')} km`;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Marcos do pedido em ms desde o início: recebido -> preparo -> saiu -> entregue.
export const TEMPOS_PADRAO = { preparo: 2500, saiu: 6000, entrega: 20000 };

export function gerarTempos(durMin) {
  if (MODO_TEMPO === 'real') {
    const saiu = 60000 + PREPARO_REAL_MIN * 60000;
    return { preparo: 60000, saiu, entrega: saiu + durMin * 60000 };
  }
  const viagem = clamp(durMin * 2500, 15000, 45000);
  return { preparo: 2500, saiu: 7000, entrega: 7000 + viagem };
}

// Estado do pedido a partir do tempo decorrido. Todo aparelho calcula igual.
// p = fração do caminho percorrida, com variação de velocidade (semáforos, curvas).
export function estado(ms, t = TEMPOS_PADRAO) {
  const e = Math.max(0, ms);
  const f = clamp(e / t.entrega);
  if (e < t.preparo) return { stage: 0, p: 0, f };
  if (e < t.saiu) return { stage: 1, p: 0, f };
  if (e < t.entrega) {
    const x = (e - t.saiu) / (t.entrega - t.saiu);
    return { stage: 2, p: clamp(x + 0.025 * Math.sin(x * Math.PI * 6)), f };
  }
  return { stage: 3, p: 1, f: 1 };
}

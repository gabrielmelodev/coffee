// Pedido único compartilhado. Na Vercel usa Upstash Redis (REST); sem as variáveis, cai para memória (só local).
import { MOTOBOYS } from '../../../lib/loja';
import { normalizarDestino, calcularRota } from '../../../lib/rota';
import { gerarTempos } from '../../../lib/timeline';

export const dynamic = 'force-dynamic';

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'coffee-books:pedido';
const mem = globalThis;

async function cmd(args) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(args),
    cache: 'no-store',
  });
  return (await r.json()).result;
}
async function ler() {
  if (!URL_) return mem.__pedido ?? null;
  const v = await cmd(['GET', KEY]);
  return v ? JSON.parse(v) : null;
}
async function gravar(p) {
  if (!URL_) { mem.__pedido = p; return; }
  const ttl = Math.ceil(p.tempos.entrega / 1000) + 600;
  await cmd(['SET', KEY, JSON.stringify(p), 'EX', ttl]);
}
async function apagar() {
  if (!URL_) { mem.__pedido = null; return; }
  await cmd(['DEL', KEY]);
}

export async function GET() {
  try {
    return Response.json({ pedido: await ler(), now: Date.now() });
  } catch {
    return Response.json({ pedido: null, now: Date.now() });
  }
}

export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  // Posição arredondada (~100 m): o painel é público e não deve expor o endereço exato.
  const destino = normalizarDestino(b.destino?.lat, b.destino?.lng);
  const rota = await calcularRota(destino);
  const id = Math.floor(1000 + Math.random() * 9000);
  const pedido = {
    id,
    nome: String(b.nome || '').slice(0, 40) || 'Cliente',
    itens: Array.isArray(b.itens) ? b.itens.slice(0, 20) : [],
    total: Number(b.total) || 0,
    destino,
    rota,
    tempos: gerarTempos(rota.durMin),
    motoboy: MOTOBOYS[id % MOTOBOYS.length],
    startedAt: Date.now(),
  };
  await gravar(pedido);
  return Response.json({ pedido, now: Date.now() });
}

export async function DELETE() {
  await apagar();
  return Response.json({ ok: true });
}

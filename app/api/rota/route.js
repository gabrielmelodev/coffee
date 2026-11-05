// Prévia da rota (distância, tempo e traçado) antes de fazer o pedido.
import { normalizarDestino, calcularRota } from '../../../lib/rota';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const u = new URL(req.url);
  const destino = normalizarDestino(u.searchParams.get('lat'), u.searchParams.get('lng'));
  return Response.json({ destino, ...(await calcularRota(destino)) });
}

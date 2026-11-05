// Usado só no servidor: valida o destino e calcula a rota real por ruas (OSRM).
import { LOJA, RAIO_KM, DESTINO_DEMO, distanciaKm } from './loja';

export function normalizarDestino(lat, lng) {
  lat = Number(lat);
  lng = Number(lng);
  let d =
    Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
      ? { lat: Math.round(lat * 1000) / 1000, lng: Math.round(lng * 1000) / 1000 } // ~100 m
      : DESTINO_DEMO;
  if (distanciaKm(LOJA, d) > RAIO_KM) d = DESTINO_DEMO;
  return d;
}

const reduzir = (pts, max = 90) => {
  if (pts.length <= max) return pts;
  const passo = (pts.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => pts[Math.round(i * passo)]);
};

export async function calcularRota(destino) {
  try {
    const r = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${LOJA.lng},${LOJA.lat};${destino.lng},${destino.lat}?overview=full&geometries=geojson`,
      { signal: AbortSignal.timeout(4000), cache: 'no-store' }
    );
    const rt = (await r.json())?.routes?.[0];
    const c = rt?.geometry?.coordinates;
    if (c?.length > 1) {
      return {
        coords: reduzir(c.map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)])),
        km: rt.distance / 1000,
        durMin: Math.max(1, Math.round(rt.duration / 60)),
        real: true,
      };
    }
  } catch {}
  const km = distanciaKm(LOJA, destino) * 1.3;
  return {
    coords: [[LOJA.lng, LOJA.lat], [destino.lng, destino.lat]],
    km,
    durMin: Math.max(2, Math.round((km / 20) * 60)),
    real: false,
  };
}

// Endereço <-> coordenadas (Nominatim/OpenStreetMap), chamado pelo navegador.
import { LOJA } from './loja';

const curto = (d) => {
  const a = d?.address || {};
  const rua = [a.road, a.house_number].filter(Boolean).join(', ');
  const bairro = a.suburb || a.neighbourhood || a.city_district;
  return [rua, bairro].filter(Boolean).join(' - ') || d?.display_name?.split(',').slice(0, 2).join(',') || null;
};

export async function reverso(lat, lng) {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&accept-language=pt-BR&lat=${lat}&lon=${lng}`);
    return curto(await r.json());
  } catch {
    return null;
  }
}

export async function buscar(texto) {
  try {
    const q = /formosa/i.test(texto) ? texto : `${texto}, Formosa, GO`;
    const v = 0.25;
    const url =
      `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&countrycodes=br&accept-language=pt-BR` +
      `&viewbox=${LOJA.lng - v},${LOJA.lat + v},${LOJA.lng + v},${LOJA.lat - v}&bounded=1&q=${encodeURIComponent(q)}`;
    const d = (await (await fetch(url)).json())?.[0];
    if (!d) return null;
    return { lat: Number(d.lat), lng: Number(d.lon), rotulo: curto(d) };
  } catch {
    return null;
  }
}

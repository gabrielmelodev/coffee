// TROQUE pelas coordenadas do endereço real da cafeteria.
// No Google Maps: botão direito no local > copie "latitude, longitude".
export const LOJA = {
  nome: 'Coffee & Books',
  endereco: 'Centro, Formosa - GO',
  lat: -15.5372,
  lng: -47.334,
};

export const RAIO_KM = 5;
// Usado quando o visitante não informa endereço ou está fora do raio (~1 km da loja).
export const DESTINO_DEMO = { lat: -15.5445, lng: -47.3265 };

// 'demo': o pedido anda rápido (30-60 s) para apresentar.
// 'real': usa o tempo verdadeiro (preparo + duração da rota nas ruas).
export const MODO_TEMPO = 'demo';
export const PREPARO_REAL_MIN = 8; // minutos de preparo exibidos na estimativa

export const MOTOBOYS = [
  { nome: 'Rafael S.', moto: 'Honda CG 160', placa: 'RFS-4F21' },
  { nome: 'Camila O.', moto: 'Yamaha Factor 150', placa: 'QWE-2J87' },
  { nome: 'Diego M.', moto: 'Honda Biz 125', placa: 'PLK-9B34' },
  { nome: 'Patrícia L.', moto: 'Honda CG 160', placa: 'OKM-5C10' },
];

export function distanciaKm(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

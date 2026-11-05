'use client';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { LOJA } from '../lib/loja';

const T = 256;
const Z_SEGUE = 16;
const mx = (lng, z) => ((lng + 180) / 360) * T * 2 ** z;
const my = (lat, z) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * T * 2 ** z;
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Só re-renderiza quando o conjunto de tiles muda (não a cada quadro da câmera).
const Tiles = memo(function Tiles({ z, x0, x1, y0, y1 }) {
  const n = 2 ** z;
  const lista = [];
  for (let y = y0; y <= y1; y++) {
    if (y < 0 || y >= n) continue;
    for (let x = x0; x <= x1; x++) {
      lista.push(
        <image className="tile" key={`${z}/${x}/${y}`} href={`https://tile.openstreetmap.org/${z}/${((x % n) + n) % n}/${y}.png`} x={x * T} y={y * T} width={T} height={T} />
      );
    }
  }
  return <g style={{ filter: 'sepia(0.45) saturate(0.8)' }}>{lista}</g>;
});

function pontoEm(geo, f) {
  const alvo = clamp(f) * geo.total;
  let i = 1;
  while (i < geo.cum.length - 1 && geo.cum[i] < alvo) i++;
  const [ax, ay] = geo.w[i - 1];
  const [bx, by] = geo.w[i];
  const seg = geo.cum[i] - geo.cum[i - 1] || 1;
  const k = clamp((alvo - geo.cum[i - 1]) / seg);
  return { x: ax + (bx - ax) * k, y: ay + (by - ay) * k, ang: Math.atan2(by - ay, bx - ax) };
}

export default function RouteMap({ stage, p, destino, coords, legenda }) {
  const box = useRef(null);
  const [dim, setDim] = useState({ w: 640, h: 560 });
  const [manual, setManual] = useState(null); // 'seguir' | 'rota' | null (automático)

  useEffect(() => setManual(null), [stage]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setDim({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pts = useMemo(
    () => (coords?.length > 1 ? coords : [[LOJA.lng, LOJA.lat], [destino.lng, destino.lat]]),
    [coords, destino.lat, destino.lng]
  );
  const real = (coords?.length ?? 0) > 2;

  // automático: acompanha o motoboy durante a entrega; nos outros momentos mostra a rota toda
  const seguir = (manual ?? (stage === 2 ? 'seguir' : 'rota')) === 'seguir';

  const zVisao = useMemo(() => {
    const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
    const w = Math.min(...xs), e = Math.max(...xs), s = Math.min(...ys), n = Math.max(...ys);
    const livreW = Math.max(dim.w - 120, 80), livreH = Math.max(dim.h - 150, 80);
    let z = 17;
    for (; z > 3; z--) if (mx(e, z) - mx(w, z) <= livreW && my(s, z) - my(n, z) <= livreH) break;
    return z;
  }, [pts, dim.w, dim.h]);

  const z = seguir ? Z_SEGUE : zVisao;

  const geo = useMemo(() => {
    const w = pts.map(([lng, lat]) => [mx(lng, z), my(lat, z)]);
    const cum = [0];
    for (let i = 1; i < w.length; i++) cum.push(cum[i - 1] + Math.hypot(w[i][0] - w[i - 1][0], w[i][1] - w[i - 1][1]));
    const xs = w.map((q) => q[0]), ys = w.map((q) => q[1]);
    return {
      w, cum, total: cum[cum.length - 1] || 1,
      d: w.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' '),
      centro: { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 },
    };
  }, [pts, z]);

  const andando = stage >= 2;
  const cur = pontoEm(geo, andando ? p : 0);
  const cam = seguir ? cur : geo.centro;
  const ox = Math.round(cam.x - dim.w / 2);
  const oy = Math.round(cam.y - dim.h / 2);
  const a = geo.w[0], b = geo.w[geo.w.length - 1];
  const ativo = stage >= 0;
  const perto = stage === 2 && p > 0.85;
  const rastro = Math.min(p * geo.total, 110);
  const rotaKey = `${pts.length}:${pts[0]}:${pts[pts.length - 1]}`;

  return (
    <div ref={box} className="relative h-full min-h-[18rem] w-full overflow-hidden bg-paper">
      <svg width={dim.w} height={dim.h} viewBox={`0 0 ${dim.w} ${dim.h}`} role="img" aria-label="Mapa com a rota do motoboy da cafeteria até o endereço de entrega" className="absolute inset-0">
        <g key={z} className="fade-mapa">
          <g transform={`translate(${-ox} ${-oy})`}>
            <Tiles z={z} x0={Math.floor(ox / T)} x1={Math.floor((ox + dim.w) / T)} y0={Math.floor(oy / T)} y1={Math.floor((oy + dim.h) / T)} />
            <path key={`c${rotaKey}`} className="traca-rota" pathLength="1" d={geo.d} fill="none" stroke="#EFE7D9" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" style={{ strokeDasharray: 1 }} />
            <path className={andando ? 'fluxo' : ''} d={geo.d} fill="none" stroke="#7B4E2F" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={andando ? '2 12' : ativo ? '0' : '2 9'} opacity={andando ? 0.9 : ativo ? 0.55 : 0.7} />
            {stage === 2 && p > 0.005 && (
              <>
                <path d={geo.d} fill="none" stroke="#7B4E2F" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity="0.22" strokeDasharray={`${rastro} ${geo.total + 10}`} strokeDashoffset={-(p * geo.total - rastro)} />
                <path d={geo.d} fill="none" stroke="#EFE7D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" strokeDasharray={`${rastro * 0.45} ${geo.total + 10}`} strokeDashoffset={-(p * geo.total - rastro * 0.45)} />
              </>
            )}
            {andando && (
              <path d={geo.d} fill="none" stroke="#4B2E1A" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={`${p * geo.total} ${geo.total + 10}`} />
            )}

            <g transform={`translate(${a[0]} ${a[1]})`}>
              {stage >= 0 && stage < 2 && (
                <g aria-hidden>
                  <circle className="onda" r="14" fill="none" stroke="#4B2E1A" strokeWidth="3" />
                  <circle className="onda o2" r="14" fill="none" stroke="#4B2E1A" strokeWidth="3" />
                </g>
              )}
              <g key={rotaKey} className="marcador-cai">
              <circle r="13" fill="#4B2E1A" stroke="#EFE7D9" strokeWidth="3" />
              <text textAnchor="middle" y="5" fontSize="13">☕</text>
              <text y="32" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1A1A1A" stroke="#EFE7D9" strokeWidth="3" paintOrder="stroke">Coffee & Books</text>
              </g>
            </g>
            <g transform={`translate(${b[0]} ${b[1]})`}>
              {stage === 2 && (
                <g aria-hidden>
                  <circle className={`onda ${perto ? 'rapida' : ''}`} r="14" fill="none" stroke="#7B4E2F" strokeWidth="3" />
                  <circle className={`onda o2 ${perto ? 'rapida' : ''}`} r="14" fill="none" stroke="#7B4E2F" strokeWidth="3" />
                </g>
              )}
              <g key={rotaKey} className="marcador-cai" style={{ animationDelay: '0.45s' }}>
              <circle r="13" fill="#1A1A1A" stroke="#EFE7D9" strokeWidth="3" />
              <text textAnchor="middle" y="5" fontSize="13">🏠</text>
              <text y="-20" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1A1A1A" stroke="#EFE7D9" strokeWidth="3" paintOrder="stroke">Entrega</text>
              </g>
              {stage === 3 && (
                <g className="pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle className="onda" r="14" fill="none" stroke="#7B4E2F" strokeWidth="3" style={{ animationIterationCount: 2 }} />
                  <circle cx="13" cy="-13" r="9" fill="#7B4E2F" stroke="#EFE7D9" strokeWidth="2" />
                  <path d="M9 -13 l3 3 l5 -6" fill="none" stroke="#EFE7D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
            </g>

            {stage >= 2 && stage < 3 && (
              <g transform={`translate(${cur.x} ${cur.y})`}>
                {stage === 2 && <circle className="pulse-ring" r="8" fill="#7B4E2F" />}
                <g className="balanca">
                <path transform={`rotate(${(cur.ang * 180) / Math.PI})`} d="M24 0 L13 -8 L13 8 Z" fill="#7B4E2F" stroke="#EFE7D9" strokeWidth="2" strokeLinejoin="round" />
                <circle r="14" fill="#7B4E2F" stroke="#EFE7D9" strokeWidth="3" />
                <text textAnchor="middle" y="5" fontSize="14">🛵</text>
                </g>
              </g>
            )}
          </g>
        </g>

        <rect x="0" y={dim.h - 20} width={dim.w} height="20" fill="#EFE7D9" opacity="0.88" />
        <text x="8" y={dim.h - 6} fontSize="11" fill="#1A1A1A">{real ? 'Rota por ruas' : 'Rota estimada em linha reta'}</text>
        <text x={dim.w - 8} y={dim.h - 6} textAnchor="end" fontSize="11" fill="#1A1A1A">© OpenStreetMap</text>
      </svg>

      {legenda && (
        <p className="absolute left-3 top-3 max-w-[85%] rounded-full bg-paper/95 px-3 py-1 text-sm font-medium text-espresso shadow" aria-live="polite">{legenda}</p>
      )}
      {stage === 2 && (
        <button type="button" onClick={() => setManual(seguir ? 'rota' : 'seguir')} className="absolute bottom-7 left-3 rounded-full bg-espresso px-3 py-1.5 text-sm font-medium text-paper shadow hover:bg-caramel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">
          {seguir ? 'Ver rota toda' : 'Seguir motoboy'}
        </button>
      )}
    </div>
  );
}

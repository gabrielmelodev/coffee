'use client';
import { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Estante do topo: os livros sobem um a um ao carregar e continuam subindo,
// em velocidades diferentes, conforme você rola a página.
export default function BookShelf({ livros }) {
  const itens = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const quadro = () => {
      const p = clamp(window.scrollY / 700);
      itens.current.forEach((el, i) => {
        if (!el) return;
        const dy = -p * (30 + (i % 4) * 26);
        const rot = p * (i % 2 ? 1 : -1) * (3 + (i % 3) * 2);
        el.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });
    };
    const agendar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(quadro); };
    quadro();
    window.addEventListener('scroll', agendar, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', agendar); };
  }, []);

  return (
    <div aria-hidden className="flex items-end justify-center gap-1 border-b-8 border-caramel">
      {livros.map(([w, h, c], i) => (
        <div key={i} ref={(el) => (itens.current[i] = el)} style={{ willChange: 'transform' }}>
          <div className="livro-puxa">
          <div
            className="livro-sobe rounded-t-sm border border-ink/10"
            style={{
              width: w,
              height: h,
              background: c,
              '--i': i,
              '--r': `${i % 2 ? 6 : -6}deg`,
              boxShadow: 'inset 0 7px 0 rgba(239,231,217,.25), inset 0 -7px 0 rgba(239,231,217,.2)',
            }}
          />
          </div>
        </div>
      ))}
    </div>
  );
}

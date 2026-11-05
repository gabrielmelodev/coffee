'use client';
import { useEffect } from 'react';

// Anima, ligado ao scroll, qualquer elemento com data-rise="book|page|rise".
// data-i="N" escalona os irmãos (um depois do outro).
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const out = (t) => 1 - Math.pow(1 - t, 3);

const VARIANTES = {
  // livro que se levanta na estante
  book: { o: '50% 100%', t: (e) => `perspective(900px) translateY(${(1 - e) * 80}px) rotateX(${(1 - e) * 60}deg)` },
  // folha que abre a partir da lombada
  page: { o: '0% 50%', t: (e) => `perspective(1200px) rotateY(${(1 - e) * 65}deg) translateX(${(1 - e) * -24}px)` },
  // sobe da base da página
  rise: { o: '50% 100%', t: (e) => `translateY(${(1 - e) * 64}px)` },
};

export default function ScrollFX() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-rise]')];
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => { el.style.opacity = '1'; });
      return;
    }

    let tops = [];
    let alcance = 0;
    let raf = 0;

    // posição de cada elemento sem a própria transformação (evita tremer)
    const medir = () => {
      tops = els.map((el) => {
        const t = el.style.transform;
        el.style.transform = 'none';
        const y = el.getBoundingClientRect().top + window.scrollY;
        el.style.transform = t;
        return y;
      });
      alcance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const quadro = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      els.forEach((el, i) => {
        const v = VARIANTES[el.dataset.rise] || VARIANTES.rise;
        const atraso = (Number(el.dataset.i) || 0) * 0.14;
        // o fim da animação nunca passa do fim da página (senão o rodapé nunca terminaria de aparecer)
        const ini = tops[i] - vh * 0.96;
        const fim = Math.min(tops[i] - vh * 0.62, alcance);
        const raw = fim > ini ? (y - ini) / (fim - ini) : y >= ini ? 1 : 0;
        const p = clamp(raw * (1 + atraso) - atraso);
        el.style.transformOrigin = v.o;
        el.style.transform = p >= 1 ? 'none' : v.t(out(p));
        el.style.opacity = String(clamp(p * 1.8));
        el.style.willChange = p > 0 && p < 1 ? 'transform, opacity' : 'auto';
      });
    };

    const agendar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(quadro); };
    const remedir = () => { medir(); agendar(); };

    remedir();
    document.fonts?.ready.then(remedir);
    const ro = new ResizeObserver(remedir);
    ro.observe(document.body);
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', remedir);
    window.addEventListener('load', remedir);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', remedir);
      window.removeEventListener('load', remedir);
    };
  }, []);

  return null;
}

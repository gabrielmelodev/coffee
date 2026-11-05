'use client';
import { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Barra de leitura no topo, cabeçalho que encolhe e link da seção atual sublinhado.
export default function ScrollProgress() {
  const barra = useRef(null);

  useEffect(() => {
    const links = [...document.querySelectorAll('header nav a[href^="#"]')].filter((a) => a.getAttribute('href').length > 1);
    const secoes = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
    const raiz = document.documentElement;
    let raf = 0;

    const quadro = () => {
      const y = window.scrollY;
      const max = raiz.scrollHeight - window.innerHeight;
      if (barra.current) barra.current.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;
      raiz.toggleAttribute('data-scrolled', y > 8);
      const meio = window.innerHeight * 0.4;
      let ativo = -1;
      secoes.forEach((s, i) => {
        if (!s) return;
        const r = s.getBoundingClientRect();
        if (r.top <= meio && r.bottom > meio) ativo = i;
      });
      links.forEach((a, i) => (i === ativo ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
    };
    const agendar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(quadro); };

    quadro();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
      raiz.removeAttribute('data-scrolled');
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[3px]">
      <div ref={barra} className="h-full origin-left bg-caramel" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

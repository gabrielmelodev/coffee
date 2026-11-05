'use client';
import { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const out = (t) => 1 - Math.pow(1 - t, 3);

const LIVROS = [
  { id: 'conceito', nome: 'Conceito', w: 84, cor: '#7B4E2F', txt: '#EFE7D9', dx: -3, r: -1.2 },
  { id: 'produtos', nome: 'Produtos', w: 70, cor: '#D7C2A3', txt: '#1A1A1A', dx: 4, r: 1.5 },
  { id: 'juridico', nome: 'Jurídico', w: 78, cor: '#1A1A1A', txt: '#EFE7D9', dx: -2, r: -0.8 },
  { id: 'capital', nome: 'Capital', w: 64, cor: '#EFE7D9', txt: '#4B2E1A', dx: 5, r: 1.8 },
  { id: 'socioambiental', nome: 'Impacto', w: 74, cor: '#4B2E1A', txt: '#EFE7D9', dx: -4, r: -1.4 },
];

// Pilha de livros no canto: cada seção que você alcança coloca mais um livro na pilha.
// Também funciona como atalho para as seções.
export default function BookStack() {
  const refs = useRef([]);

  useEffect(() => {
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const quadro = () => {
      const vh = window.innerHeight;
      LIVROS.forEach((l, i) => {
        const el = refs.current[i];
        const sec = document.getElementById(l.id);
        if (!el || !sec) return;
        const r = sec.getBoundingClientRect();
        const e = reduz ? 1 : out(clamp((vh * 0.8 - r.top) / (vh * 0.3)));
        const ativo = r.top < vh * 0.45 && r.bottom > vh * 0.45;
        el.style.opacity = String(e);
        el.style.transform = `translate(${l.dx + (ativo ? -8 : 0)}px, ${-(1 - e) * 70}px) rotate(${l.r}deg)`;
        el.style.pointerEvents = e > 0.5 ? 'auto' : 'none';
      });
    };
    const agendar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(quadro); };
    quadro();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
    };
  }, []);

  return (
    <nav aria-label="Seções da página" className="pointer-events-none fixed bottom-6 right-4 z-20 hidden flex-col-reverse items-end gap-0.5 xl:flex">
      {LIVROS.map((l, i) => (
        <a
          key={l.id}
          ref={(el) => (refs.current[i] = el)}
          href={`#${l.id}`}
          aria-label={`Ir para ${l.nome}`}
          style={{ width: l.w, background: l.cor, color: l.txt, opacity: 0 }}
          className="flex h-7 items-center rounded-sm px-2 text-[11px] font-medium shadow-[0_0_0_1px_rgba(239,231,217,.55),0_0_0_2px_rgba(26,26,26,.25),0_6px_10px_rgba(0,0,0,.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
        >
          {l.nome}
        </a>
      ))}
    </nav>
  );
}

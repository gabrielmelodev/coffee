'use client';
import { useEffect, useRef } from 'react';

// Livro 3D em CSS puro: entra caindo, flutua, abre a capa, vira as páginas e fecha em ciclo.
// Segue o mouse e gira conforme o scroll. Capa original, na identidade da casa.
// A Luta pelo Direito (Jhering, 1872) é obra de domínio público.
export default function Book3D() {
  const gira = useRef(null);

  useEffect(() => {
    const el = gira.current;
    const base = { rx: 10, ry: -32 };
    el.style.transform = `rotateX(${base.rx}deg) rotateY(${base.ry}deg)`;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const alvo = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, s: 0 };
    let raf = 0;
    let vis = true;
    const mover = (e) => { alvo.x = (e.clientX / window.innerWidth) * 2 - 1; alvo.y = (e.clientY / window.innerHeight) * 2 - 1; };
    const quadro = () => {
      const s = Math.min(1, window.scrollY / 900);
      cur.x += (alvo.x - cur.x) * 0.08;
      cur.y += (alvo.y - cur.y) * 0.08;
      cur.s += (s - cur.s) * 0.08;
      el.style.transform = `rotateX(${(base.rx - cur.y * 8 + cur.s * 10).toFixed(2)}deg) rotateY(${(base.ry + cur.x * 18 + cur.s * 110).toFixed(2)}deg)`;
      raf = vis ? requestAnimationFrame(quadro) : 0;
    };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(quadro); });
    io.observe(el);
    window.addEventListener('pointermove', mover, { passive: true });
    raf = requestAnimationFrame(quadro);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', mover); };
  }, []);

  return (
    <figure className="l3d-palco relative mx-auto flex h-[400px] w-full items-center justify-center md:h-[470px]">
      <div aria-hidden className="l3d-sombra" />
      <div role="img" aria-label="Livro A Luta pelo Direito, de Rudolf von Jhering, girando em 3D e abrindo a capa" className="l3d-entra">
        <div className="l3d-flutua">
          <div ref={gira} className="l3d-gira">
            <div className="l3d">
              <div className="l3d-f l3d-capa-tras" />
              <div className="l3d-f l3d-lombada"><i>✦</i><b>A Luta pelo Direito</b><i>C&B</i></div>
              <div className="l3d-f l3d-dir" />
              <div className="l3d-f l3d-topo" />
              <div className="l3d-f l3d-base" />
              <div className="l3d-f l3d-fixa"><div className="linhas" /></div>
              {[2, 1, 0].map((k) => (
                <div key={k} className={`l3d-pag l3d-p${k}`} style={{ '--k': k }}>
                  <div className="l3d-pf">
                    {k === 0 ? (
                      <div className="text-center"><p className="l3d-tp">A Luta pelo Direito</p><p className="mt-1 opacity-70">Rudolf von Jhering · 1872</p><div className="linhas mt-4" /></div>
                    ) : <div className="linhas" />}
                  </div>
                  <div className="l3d-pv"><div className="linhas" /></div>
                </div>
              ))}
              <div className="l3d-capa">
                <div className="l3d-f l3d-fora">
                  <p className="text-[.62em] uppercase tracking-[.35em] opacity-80">Direito</p>
                  <div>
                    <h2 className="font-display text-[1.7em] font-semibold leading-[1.08]">A Luta<br />pelo<br />Direito</h2>
                    <p className="mx-auto mt-3 h-px w-10 bg-latte/70" />
                    <p className="mt-3 text-[.8em] tracking-wide">Rudolf von Jhering</p>
                  </div>
                  <p className="text-[.62em] uppercase tracking-[.3em] opacity-80">Coffee &amp; Books</p>
                </div>
                <div className="l3d-f l3d-dentro" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="absolute bottom-0 left-0 right-0 text-center text-xs text-ink/60">Mexa o mouse ou role a página. A Luta pelo Direito, Jhering (1872).</figcaption>
    </figure>
  );
}

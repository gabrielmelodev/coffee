'use client';
import { useEffect, useRef } from 'react';

// Logo real em 3D: a imagem é empilhada em camadas (profundidade de verdade em CSS 3D),
// balança sozinha e acompanha o mouse. Pausa fora da tela; com "reduzir movimento" fica parada.
const CAMADAS = 14;
const PASSO = 2.4;

export default function Marca3D() {
  const gira = useRef(null);

  useEffect(() => {
    const el = gira.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const alvo = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let vis = false;
    const mover = (e) => { alvo.x = (e.clientX / window.innerWidth) * 2 - 1; alvo.y = (e.clientY / window.innerHeight) * 2 - 1; };
    const quadro = () => {
      cur.x += (alvo.x - cur.x) * 0.08;
      cur.y += (alvo.y - cur.y) * 0.08;
      el.style.transform = `rotateX(${(-cur.y * 10).toFixed(2)}deg) rotateY(${(cur.x * 16).toFixed(2)}deg)`;
      raf = vis ? requestAnimationFrame(quadro) : 0;
    };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(quadro); });
    io.observe(el);
    window.addEventListener('pointermove', mover, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', mover); };
  }, []);

  return (
    <div data-rise="rise" className="mt-14">
      <h3 className="font-display text-2xl text-caramel">A marca</h3>
      <div className="m3d-palco mt-5 flex items-center justify-center overflow-hidden rounded-lg bg-ink px-4 py-14">
        <div role="img" aria-label="Logotipo Coffee & Books em 3D: xícara de café com livro aberto" className="m3d-gira-wrap">
          <div ref={gira} className="m3d-gira">
            <div className="m3d-osc">
              <div className="m3d">
                {Array.from({ length: CAMADAS }, (_, i) => (
                  <img key={i} src="/img/logo-sombra.png" alt="" aria-hidden draggable="false"
                    style={{ transform: `translateZ(${((i - CAMADAS) * PASSO).toFixed(1)}px)`, filter: `brightness(${(0.35 + i * 0.045).toFixed(3)})` }} />
                ))}
                <img src="/img/logo.png" alt="" aria-hidden draggable="false" style={{ transform: 'translateZ(2px)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink/60">Boa leitura começa com um bom café.</p>
    </div>
  );
}

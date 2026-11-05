'use client';
import { useEffect, useRef, useState } from 'react';
import useLiveOrder from './useLiveOrder';
import RouteMap from './RouteMap';
import OrderStatus from './OrderStatus';
import { brl, fmtKm } from '../lib/timeline';
import { RAIO_KM, DESTINO_DEMO, LOJA, PREPARO_REAL_MIN, distanciaKm } from '../lib/loja';
import { reverso, buscar } from '../lib/geo';

const ITEMS = [
  { id: 1, nome: 'Cappuccino cremoso', preco: 14 },
  { id: 2, nome: 'Torta de frutas vermelhas', preco: 19 },
  { id: 3, nome: 'Sanduíche de pernil', preco: 26 },
  { id: 4, nome: 'Cookie de chocolate', preco: 9 },
];

const btn = 'h-9 w-9 rounded-full border border-espresso/30 text-lg hover:bg-latte/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-espresso';
const papel = 'bg-paper [background-image:linear-gradient(90deg,rgba(75,46,26,0.05),transparent_6%,transparent_94%,rgba(75,46,26,0.07))]';
const face = 'absolute inset-0 overflow-hidden [backface-visibility:hidden]';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const FLIP_INI = 0.1;
const FLIP_FIM = 0.55;

export default function Delivery() {
  const live = useLiveOrder();
  const [cart, setCart] = useState({ 1: 1, 2: 1 });
  const [nome, setNome] = useState('');
  const [montando, setMontando] = useState(true);
  const [local, setLocal] = useState({ estado: 'parado' });
  const [busca, setBusca] = useState('');
  const [previa, setPrevia] = useState(null);
  const [livroAtivo, setLivroAtivo] = useState(false);

  const secao = useRef(null);
  const livro = useRef(null);
  const folha = useRef(null);
  const frente = useRef(null);
  const verso = useRef(null);

  const subtotal = ITEMS.reduce((s, i) => s + i.preco * (cart[i.id] || 0), 0);
  const taxa = subtotal ? 6.9 : 0;
  const qtd = Object.values(cart).reduce((a, b) => a + b, 0);
  const mudar = (id, d) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + d) }));
  const form = montando || !live.pedido;

  // Endereço real: GPS do aparelho ou endereço digitado. Só vale dentro do raio de entrega.
  const arred = (n) => Math.round(n * 1000) / 1000;
  const dentro = local.estado === 'ok' && local.km <= RAIO_KM;
  const destino = dentro ? { lat: arred(local.pos.lat), lng: arred(local.pos.lng) } : DESTINO_DEMO;
  const destinoMapa = form ? destino : live.pedido.destino ?? DESTINO_DEMO;
  const coordsMapa = form ? previa?.coords : live.pedido.rota?.coords;

  const textoEndereco =
    local.estado === 'ok'
      ? dentro
        ? `${local.rotulo ?? 'Sua posição atual'} · a ${fmtKm(local.km)} da loja.`
        : `${local.rotulo ?? 'Esse local'} está a ${fmtKm(local.km)}, fora do raio de ${RAIO_KM} km. Usando um endereço de demonstração perto da loja.`
      : local.estado === 'buscando'
      ? 'Procurando…'
      : local.estado === 'erro'
      ? local.msg
      : 'Endereço de demonstração, perto da loja. Use sua localização ou digite seu endereço.';

  async function definirPonto(pos, origem, rotulo) {
    setLocal({ estado: 'ok', origem, pos, km: distanciaKm(LOJA, pos), rotulo: rotulo ?? null });
    if (!rotulo) {
      const r = await reverso(pos.lat, pos.lng);
      setLocal((l) => (l.pos === pos ? { ...l, rotulo: r } : l));
    }
  }

  function localizar() {
    if (!navigator.geolocation) {
      setLocal({ estado: 'erro', msg: 'Este navegador não oferece geolocalização.' });
      return;
    }
    setLocal({ estado: 'buscando' });
    navigator.geolocation.getCurrentPosition(
      (pos) => definirPonto({ lat: pos.coords.latitude, lng: pos.coords.longitude }, 'gps'),
      (e) =>
        setLocal({
          estado: 'erro',
          msg: e.code === 1
            ? 'Localização bloqueada. Libere o acesso no navegador ou digite seu endereço.'
            : 'Não foi possível obter sua posição. Digite seu endereço.',
        }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function procurar(e) {
    e.preventDefault();
    if (!busca.trim()) return;
    setLocal({ estado: 'buscando' });
    const r = await buscar(busca.trim());
    if (!r) setLocal({ estado: 'erro', msg: 'Endereço não encontrado em Formosa. Tente com rua e número.' });
    else definirPonto({ lat: r.lat, lng: r.lng }, 'busca', r.rotulo);
  }

  // prévia real (distância e tempo pelas ruas) antes de pedir
  useEffect(() => {
    if (!form) return;
    let vivo = true;
    setPrevia(null);
    fetch(`/api/rota?lat=${destino.lat}&lng=${destino.lng}`)
      .then((r) => r.json())
      .then((d) => vivo && setPrevia(d))
      .catch(() => {});
    return () => { vivo = false; };
  }, [destino.lat, destino.lng, form]);

  // se o navegador já tem permissão de localização, usa sozinho
  useEffect(() => {
    navigator.permissions?.query({ name: 'geolocation' }).then((r) => { if (r.state === 'granted') localizar(); }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // avisa no celular quando o pedido muda de etapa
  useEffect(() => {
    if (!form) navigator.vibrate?.(live.stage === 3 ? [150, 80, 150] : 120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live.stage]);

  const fazerPedido = async () => {
    const itens = ITEMS.filter((i) => cart[i.id]).map((i) => ({ nome: i.nome, qtd: cart[i.id], preco: i.preco }));
    await live.enviar({ nome, itens, total: subtotal + taxa, destino });
    setMontando(false);
  };

  // livro só em telas grandes; no celular fica o layout empilhado
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 620px)');
    const set = () => setLivroAtivo(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // virada de página ligada ao scroll
  useEffect(() => {
    if (!livroAtivo) return;
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const aplicar = (p) => {
      if (!livro.current || !folha.current) return;
      const entrada = ease(clamp(p / FLIP_INI));
      const flip = ease(clamp((p - FLIP_INI) / (FLIP_FIM - FLIP_INI)));
      livro.current.style.setProperty('--curva', Math.sin(flip * Math.PI).toFixed(3));
      livro.current.style.transform = `rotateX(${(1 - entrada) * 26}deg) rotateZ(${(1 - entrada) * -2.5}deg) scale(${0.9 + 0.1 * entrada})`;
      folha.current.style.transform = `translateZ(2px) rotateY(${-180 * flip}deg)`;
      // o que está escondido não recebe foco nem leitor de tela
      if (verso.current) verso.current.inert = flip < 0.6;
      if (frente.current) frente.current.inert = flip >= 0.6;
    };
    const ler = () => {
      const r = secao.current.getBoundingClientRect();
      aplicar(clamp(-r.top / (r.height - window.innerHeight)));
    };

    if (reduz) { aplicar(1); return; }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(ler); };
    ler();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [livroAtivo]);

  const painelPedido = form ? (
    <>
      <h3 className="font-display text-2xl">Montar pedido</h3>
      <label className="mt-3 block text-sm">
        Seu nome
        <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={40} placeholder="Como vamos te chamar?" className="mt-1 w-full rounded-md border border-latte bg-white px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-espresso" />
      </label>
      <ul className="mt-3 divide-y divide-latte/60">
        {ITEMS.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-3 py-2">
            <div>
              <p className="font-medium">{i.nome}</p>
              <p className="text-sm text-caramel">{brl(i.preco)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button aria-label={`Remover ${i.nome}`} onClick={() => mudar(i.id, -1)} className={btn}>−</button>
              <span key={cart[i.id] || 0} className="bump w-4 text-center tabular-nums">{cart[i.id] || 0}</span>
              <button aria-label={`Adicionar ${i.nome}`} onClick={() => mudar(i.id, 1)} className={btn}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{brl(subtotal)}</dd></div>
        <div className="flex justify-between"><dt>Entrega</dt><dd>{brl(taxa)}</dd></div>
        <div className="flex justify-between font-semibold"><dt>Total</dt><dd key={subtotal + taxa} className="bump">{brl(subtotal + taxa)}</dd></div>
      </dl>
      <div className="mt-3 rounded-md bg-latte/40 p-3 text-sm">
        <p className="font-medium">Entregar em</p>
        <p className={local.estado === 'erro' ? 'text-[#8a2b1d]' : 'text-caramel'} aria-live="polite">{textoEndereco}</p>
        {previa && (
          <p className="mt-1 text-ink/80">
            {fmtKm(previa.km)} pelas ruas · entrega em cerca de {PREPARO_REAL_MIN + previa.durMin} min
          </p>
        )}
        <button type="button" onClick={localizar} disabled={local.estado === 'buscando'} className="mt-2 rounded-full border border-espresso px-4 py-1.5 font-medium text-espresso hover:bg-latte/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso disabled:opacity-60">
          {local.estado === 'buscando' ? 'Localizando…' : 'Usar minha localização'}
        </button>
        <form onSubmit={procurar} className="mt-2 flex gap-2">
          <label className="sr-only" htmlFor="end-busca">Endereço de entrega</label>
          <input id="end-busca" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ou digite rua e número" className="min-w-0 flex-1 rounded-md border border-latte bg-white px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-espresso" />
          <button type="submit" className="rounded-full bg-espresso px-4 py-1.5 font-medium text-paper hover:bg-caramel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">Buscar</button>
        </form>
        <p className="mt-3 text-xs leading-relaxed text-ink/70">
          Privacidade (LGPD, Lei 13.709/2018): usamos seu endereço e sua localização só para calcular a rota e o tempo da entrega. A posição é arredondada (cerca de 100 m) antes de aparecer no painel, o pedido expira em 15 minutos e o endereço é consultado em serviços de mapa de terceiros (OpenStreetMap). Demonstração acadêmica, sem pedido real.
        </p>
      </div>
      <button disabled={!qtd} onClick={fazerPedido} className="mt-4 w-full rounded-full bg-espresso py-3 font-medium text-paper hover:bg-caramel disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">
        Fazer pedido
      </button>
    </>
  ) : (
    <>
      <OrderStatus pedido={live.pedido} stage={live.stage} eta={live.eta} kmRestante={live.kmRestante} chegada={live.chegada} />
      {live.stage === 3 && (
        <button onClick={() => setMontando(true)} className="mt-5 w-full rounded-full border border-espresso py-3 font-medium hover:bg-latte/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-espresso">
          Fazer outro pedido
        </button>
      )}
    </>
  );

  const legenda = !form && live.stage === 2 ? `${live.pedido.motoboy?.nome ?? 'Motoboy'} · a ${fmtKm(live.kmRestante)} · ${live.eta} min` : null;
  const mapa = <RouteMap stage={form ? -1 : live.stage} p={form ? 0 : live.p} destino={destinoMapa} coords={coordsMapa} legenda={legenda} />;

  /* ---------- celular e telas baixas: layout empilhado ---------- */
  if (!livroAtivo) {
    return (
      <section id="delivery" className="scroll-mt-16 bg-espresso text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2 className="font-display text-4xl md:text-5xl">Seu café chega até a página que você parou.</h2>
          <p className="mt-4 max-w-xl text-latte">
            Monte um pedido de demonstração e acompanhe o motoboy no mapa. O pedido também aparece ao vivo no <a href="/painel" className="underline">painel de apresentação</a>. Tudo aqui é simulado.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
            <div className="relative overflow-hidden rounded-lg bg-paper p-6 text-ink"><div key={form ? 'f' : 's'} className="troca-pagina">{painelPedido}</div></div>
            <div className="h-[26rem] overflow-hidden rounded-lg bg-paper lg:h-auto">{mapa}</div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- livro com virada de página no scroll ---------- */
  return (
    <section id="delivery" ref={secao} className="relative h-[270vh] scroll-mt-16 bg-espresso text-paper">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-3 px-3">
        <div className="[perspective:1800px]">
          <div ref={livro} className="relative h-[min(78vh,700px)] w-[min(94vw,1080px)] text-ink [transform-style:preserve-3d]" style={{ '--curva': 0 }}>
            <div aria-hidden className="absolute -inset-3 rounded-[1.6rem] bg-ink shadow-[0_40px_80px_rgba(0,0,0,0.55)] [transform:translateZ(-12px)]" />
            <div aria-hidden className="absolute -inset-1.5 rounded-[1.3rem] bg-caramel [transform:translateZ(-8px)]" />

            {/* esquerda fixa: aparece antes da virada */}
            <div className={`absolute left-0 top-0 flex h-full w-1/2 flex-col justify-between rounded-l-2xl p-10 ${papel}`}>
              <p className="text-sm text-caramel">Capítulo III</p>
              <div>
                <h2 className="font-display text-7xl font-semibold leading-none text-espresso">Delivery</h2>
                <p className="mt-5 max-w-xs leading-relaxed text-ink/75">Role para virar a página e fazer seu pedido.</p>
              </div>
              <p className="text-xs text-ink/50">42</p>
            </div>

            {/* direita fixa: o mapa, revelado depois da virada */}
            <div className={`absolute right-0 top-0 h-full w-1/2 rounded-r-2xl p-4 ${papel}`}>
              <div className="relative h-full overflow-hidden rounded-lg border border-latte">{mapa}</div>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-r-2xl bg-[linear-gradient(90deg,rgba(26,26,26,0.45),transparent_55%)]" style={{ opacity: 'calc(var(--curva) * 0.7)' }} />
            </div>

            {/* a folha: frente na direita, verso (o pedido) cai na esquerda */}
            <div ref={folha} className="absolute right-0 top-0 h-full w-1/2 [transform-origin:left_center] [transform-style:preserve-3d]" style={{ transform: 'translateZ(2px)' }}>
              <div ref={frente} className={`${face} flex flex-col justify-between rounded-r-2xl p-10 ${papel}`}>
                <p className="text-sm text-caramel">Coffee & Books</p>
                <div>
                  <h3 className="font-display text-5xl font-semibold leading-[1.05] text-espresso">Seu café chega até a página que você parou.</h3>
                  <p className="mt-5 leading-relaxed text-ink/80">
                    Monte um pedido de demonstração e acompanhe o motoboy no mapa. Ele também aparece ao vivo no <a href="/painel" className="underline">painel de apresentação</a>. Tudo aqui é simulado.
                  </p>
                </div>
                <p className="text-right text-xs text-ink/50">43</p>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(26,26,26,0.5),transparent_70%)]" style={{ opacity: 'calc(var(--curva) * 0.8)' }} />
              </div>

              <div ref={verso} className={`${face} rounded-l-2xl [transform:rotateY(180deg)] ${papel}`}>
                <div className="h-full overflow-y-auto p-8"><div key={form ? 'f' : 's'} className="troca-pagina">{painelPedido}</div></div>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(26,26,26,0.5),transparent_70%)]" style={{ opacity: 'calc(var(--curva) * 0.8)' }} />
              </div>
            </div>

            <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(26,26,26,0.35),transparent)] [transform:translateZ(3px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

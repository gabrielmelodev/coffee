// Itens da casa desenhados em SVG (nenhuma imagem do PDF). Usa a logo real da Coffee & Books.
const F = { fontFamily: 'var(--font-display), serif', fontWeight: 700 };

function Marca({ x, y, s, cor, cheia }) {
  const claro = cor === '#D7C2A3' ? '-claro' : '';
  return <image href={`/img/${cheia ? 'logo' : 'marca'}${claro}.png`} x={x} y={y} width={s} height={cheia ? s * 0.612 : s * 0.956} />;
}

const itens = [
  {
    nome: 'Xícara com pires', texto: 'Para o café servido na casa.',
    arte: (
      <>
        <ellipse cx="100" cy="158" rx="76" ry="15" fill="#EFE7D9" stroke="#D7C2A3" />
        <path d="M148 88h9a15 15 0 0 1 0 30h-14" fill="none" stroke="#D7C2A3" strokeWidth="7" strokeLinecap="round" />
        <path d="M52 84h96v20a48 42 0 0 1-96 0z" fill="#FBF6EA" stroke="#D7C2A3" />
        <ellipse cx="100" cy="84" rx="48" ry="9" fill="#EFE7D9" stroke="#D7C2A3" />
        <ellipse cx="100" cy="85" rx="41" ry="6.5" fill="#7B4E2F" />
        <Marca x={78} y={92} s={44} cor="#4B2E1A" />
        <path className="vapor" d="M86 70c-8-8 8-14 0-24" fill="none" stroke="#7B4E2F" strokeWidth="3" strokeLinecap="round" />
        <path className="vapor v2" d="M104 70c-8-8 8-14 0-24" fill="none" stroke="#7B4E2F" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  {
    nome: 'Caneca reutilizável', texto: 'Quem traz a própria caneca ganha desconto.',
    arte: (
      <>
        <ellipse cx="100" cy="166" rx="60" ry="9" fill="rgba(26,26,26,.15)" />
        <path d="M138 80h10a16 16 0 0 1 0 38h-12" fill="none" stroke="#4B2E1A" strokeWidth="9" strokeLinecap="round" />
        <rect x="58" y="62" width="84" height="102" rx="10" fill="#4B2E1A" />
        <ellipse cx="100" cy="62" rx="42" ry="8" fill="#7B4E2F" />
        <ellipse cx="100" cy="63" rx="35" ry="5.5" fill="#2f1c10" />
        <rect x="64" y="72" width="6" height="84" rx="3" fill="rgba(239,231,217,.15)" />
        <Marca x={70} y={86} s={60} cor="#D7C2A3" />
        <path className="vapor" d="M90 48c-8-8 8-14 0-24" fill="none" stroke="#7B4E2F" strokeWidth="3" strokeLinecap="round" />
        <path className="vapor v2" d="M108 48c-8-8 8-14 0-24" fill="none" stroke="#7B4E2F" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  {
    nome: 'Sacola de algodão', texto: 'Para levar livros e compras sem plástico.',
    arte: (
      <g className="sacola">
        <ellipse cx="100" cy="184" rx="56" ry="8" fill="rgba(26,26,26,.15)" />
        <path d="M74 78V58a26 26 0 0 1 52 0v20" fill="none" stroke="#D7C2A3" strokeWidth="6" strokeLinecap="round" />
        <path d="M54 76h92l6 104H48z" fill="#EFE7D9" stroke="#D7C2A3" strokeWidth="1.5" />
        <path d="M54 76h92" stroke="#D7C2A3" strokeWidth="3" />
        <Marca x={56} y={106} s={88} cor="#4B2E1A" cheia />
      </g>
    ),
  },
  {
    nome: 'Sacola espresso', texto: 'A mesma ideia, na cor da casa.',
    arte: (
      <g className="sacola s2">
        <ellipse cx="100" cy="184" rx="56" ry="8" fill="rgba(26,26,26,.15)" />
        <path d="M74 78V58a26 26 0 0 1 52 0v20" fill="none" stroke="#7B4E2F" strokeWidth="6" strokeLinecap="round" />
        <path d="M54 76h92l6 104H48z" fill="#4B2E1A" />
        <path d="M54 76h92" stroke="#7B4E2F" strokeWidth="3" />
        <Marca x={56} y={106} s={88} cor="#D7C2A3" cheia />
      </g>
    ),
  },
];

export default function Produtos() {
  return (
    <section id="itens" className="mx-auto max-w-6xl px-5 py-16">
      <h2 data-rise="page" className="font-display text-4xl text-espresso">Itens da casa</h2>
      <p className="mt-3 max-w-xl">Xícaras, canecas e sacolas com a marca da Coffee &amp; Books. Os itens reutilizáveis fazem parte das práticas socioambientais da casa.</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((it, i) => (
          <li key={it.nome} data-rise="book" data-i={i}>
            <div className="item-casa rounded-lg bg-latte/40 p-5">
              <svg viewBox="0 0 200 200" role="img" aria-label={it.nome} className="mx-auto w-full max-w-[220px]">{it.arte}</svg>
              <h3 className="mt-3 font-display text-xl text-espresso">{it.nome}</h3>
              <p className="mt-1 text-sm text-ink/80">{it.texto}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-ink/60">Ilustrações dos itens da casa com a logo real. Sem venda neste site de demonstração.</p>
    </section>
  );
}

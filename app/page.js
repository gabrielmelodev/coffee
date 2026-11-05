import Delivery from '../components/Delivery';
import ScrollFX from '../components/ScrollFX';
import Book3D from '../components/Book3D';
import BookStack from '../components/BookStack';
import ScrollProgress from '../components/ScrollProgress';
import Palavras from '../components/Palavras';
import Societaria from '../components/Societaria';
import Produtos from '../components/Produtos';
import Marca3D from '../components/Marca3D';

const cardapio = [
  { grupo: 'Cafés, chás e chocolates', itens: [['Espresso', 8], ['Cappuccino cremoso', 14], ['Café coado da casa', 10], ['Chá de ervas', 11], ['Chocolate quente', 16]] },
  { grupo: 'Sucos', itens: [['Laranja', 11], ['Limão com hortelã', 10], ['Maracujá', 12]] },
  { grupo: 'Sobremesas', itens: [['Bolo de cenoura', 12], ['Torta de frutas vermelhas', 19], ['Cookie de chocolate', 9], ['Brownie', 13]] },
  { grupo: 'Sanduíches e salgados', itens: [['Sanduíche de pernil', 26], ['Pão de queijo', 7], ['Torrada com ricota', 18], ['Quiche do dia', 17]] },
];

const eventos = [
  ['Clube do livro', 'Toda primeira quinta, 19h', 'Um livro por mês, uma mesa grande e café à vontade.'],
  ['Eventos literários', 'Datas na agenda da casa', 'Lançamentos, saraus e conversas com quem escreve.'],
  ['Encontro de leitores', 'Dias 15 e 30, 18h', 'Leitura em voz alta e conversa sobre o que cada um está lendo.'],
  ['Troca e doação de livros', 'Todo sábado, 10h', 'Traga um livro, leve outro. O que sobra vai para bibliotecas parceiras.'],
];

const socio = [
  'Ana Luisa Lopes Pereira', 'Emanuelly Pereira dos Santos', 'Fernando Francisco de Miranda Junior',
  'Gabriel Henrique Melo Xavier', 'Hellen Paula de Assunção Branquinho', 'Isabela Gomes Ataídes',
  'Maria Clara Oliveira Dias', 'Maria Eduarda Filiais Pereira', 'Tainá Dias da Costa', 'Vitória Gonsalves Pereira dos Santos',
];

const cores = [['#4B2E1A', 'Espresso'], ['#7B4E2F', 'Caramelo'], ['#D7C2A3', 'Latte'], ['#EFE7D9', 'Papel'], ['#1A1A1A', 'Tinta']];

const socioambiental = [
  'Copos e recipientes reutilizáveis, com desconto para quem traz a própria caneca.',
  'Menos materiais plásticos e separação correta dos resíduos gerados.',
  'Preferência por fornecedores locais: valoriza a economia da região e reduz o impacto do transporte.',
  'Livros que saem de uso vão para instituições, bibliotecas ou projetos de incentivo à leitura.',
];

const roteiro = [['Equipe', 'equipe'], ['Introdução', 'introducao'], ['Resumo executivo', 'resumo'], ['Cardápio e experiências', 'produtos'], ['Público e localização', 'publico'], ['Diferencial', 'diferencial'], ['Missão', 'missao'], ['Forma jurídica', 'juridico'], ['Capital social', 'capital'], ['Socioambiental', 'socioambiental'], ['Conclusão', 'conclusao'], ['Identidade visual', 'identidade']];

function Titulo({ n, t }) {
  return (
    <div data-rise="page" className="flex items-baseline gap-4 border-b border-latte pb-3">
      <span className="font-display text-5xl tabular-nums text-caramel/60">{String(n).padStart(2, '0')}</span>
      <h2 className="font-display text-3xl font-semibold text-espresso md:text-4xl">{t}</h2>
    </div>
  );
}

const Cartoes = ({ itens, cols = 'md:grid-cols-3' }) => (
  <ul className={`mt-8 grid gap-6 ${cols}`}>
    {itens.map(([t, d], i) => (
      <li key={t} data-rise="book" data-i={i} className="rounded-lg border border-latte bg-paper p-5">
        <h3 className="font-display text-xl text-caramel">{t}</h3>
        <p className="mt-2 leading-relaxed">{d}</p>
      </li>
    ))}
  </ul>
);

const Num = ({ itens, cols = 'md:grid-cols-3' }) => (
  <ol className={`mt-8 grid gap-5 ${cols}`}>
    {itens.map((t, i) => (
      <li key={t} data-rise="book" data-i={i} className="flex gap-4 rounded-lg border border-latte bg-paper p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso font-display text-paper">{i + 1}</span>
        <span className="leading-relaxed">{t}</span>
      </li>
    ))}
  </ol>
);

const Foto = ({ n, alt }) => (
  <img data-rise="page" src={`/img/ambiente-${n}.jpg`} alt={alt} loading="lazy" className="h-full max-h-[520px] w-full rounded-lg object-cover shadow-md" />
);

const iniciais = (nome) => { const p = nome.split(' '); return p[0][0] + p[1][0]; };

export default function Home() {
  return (
    <main>
      <div className="bg-ink px-5 py-2 text-center text-xs text-latte">Projeto acadêmico de Direito Empresarial. Site de demonstração, sem pedidos reais.</div>
      <ScrollFX />
      <BookStack />
      <ScrollProgress />
      <header className="sticky top-0 z-10 border-b border-latte bg-paper/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-display text-xl font-semibold text-espresso">Coffee & Books</a>
          <div className="flex gap-4 text-sm md:gap-5">
            <a href="#resumo" className="hidden hover:text-caramel md:inline">Resumo</a>
            <a href="#produtos" className="hover:text-caramel">Cardápio</a>
            <a href="#juridico" className="hover:text-caramel">Jurídico</a>
            <a href="#identidade" className="hidden hover:text-caramel md:inline">Identidade</a>
            <a href="#delivery" className="rounded-full bg-espresso px-4 py-1.5 text-paper hover:bg-caramel">Delivery</a>
          </div>
        </nav>
      </header>

      <section id="empresa" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div>
          <p className="entra text-caramel" style={{ '--i': 0 }}>Café & Livraria · Cafeteria e Cultura Ltda.</p>
          <Palavras as="h1" className="mt-2 font-display text-5xl font-semibold leading-[1.05] text-espresso md:text-7xl" texto="seu lugar entre uma página e outra" atraso={1} />
          <p className="entra mt-6 max-w-md text-lg text-ink/80" style={{ '--i': 7 }}>
            Boa leitura começa com um bom café. Fique o tempo que a leitura pedir, na região central de São Paulo.
          </p>
          <div className="entra mt-8 flex flex-wrap gap-3" style={{ '--i': 9 }}>
            <a href="#cardapio" className="rounded-full bg-espresso px-6 py-3 font-medium text-paper hover:bg-caramel">Ver cardápio</a>
            <a href="#delivery" className="rounded-full border border-espresso px-6 py-3 font-medium text-espresso hover:bg-latte/50">Pedir delivery</a>
          </div>
          <p className="entra mt-6 text-xs text-ink/60" style={{ '--i': 11 }}>Projeto de Plano de Negócio · Faculdades Integradas Iesgo, Curso de Direito · Formosa - GO · 2026</p>
        </div>
        <Book3D />
      </section>

      <div aria-hidden className="faixa overflow-hidden border-y border-espresso bg-espresso py-3 text-latte">
        <div className="faixa-trilho font-display text-lg italic">
          {[0, 1].map((n) => (
            <span key={n} className="flex shrink-0 gap-8 pr-8">
              {['Café coado da casa', 'Clube do livro', 'Troca de livros todo sábado', 'Sobremesas feitas na casa', 'Delivery', 'Leitura com calma'].map((t) => (
                <span key={t} className="flex items-center gap-8">{t}<span className="text-caramel">✦</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <nav aria-label="Roteiro da apresentação" className="mx-auto max-w-6xl px-5 pt-12">
        <p className="text-sm uppercase tracking-[.25em] text-caramel">Roteiro da apresentação</p>
        <ol className="mt-4 flex flex-wrap gap-2">
          {roteiro.map(([t, id], i) => (
            <li key={id}>
              <a href={`#${id}`} className="flex items-center gap-2 rounded-full border border-latte bg-paper px-3 py-1.5 text-sm hover:border-caramel hover:text-caramel">
                <span className="font-display text-caramel">{i + 1}</span>{t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="equipe" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={1} t="Equipe" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {socio.map((n, i) => (
            <li key={n} data-rise="book" data-i={i % 5} className="flex items-center gap-3 rounded-lg border border-latte bg-paper p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso font-display text-latte">{iniciais(n)}</span>
              <span className="text-sm leading-snug">{n}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="introducao" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={2} t="Introdução" />
          <p data-rise="rise" className="mt-8 max-w-3xl text-lg leading-relaxed">O plano de negócios é uma ferramenta de gestão que orienta o empreendedor na estruturação, no funcionamento e no posicionamento da empresa no mercado.</p>
          <Num itens={['Visão abrangente do empreendimento', 'Identificar riscos e minimizar erros', 'Definir estratégias para ampliar as chances de sucesso']} />
        </div>
      </section>

      <section id="resumo" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={3} t="Resumo executivo" />
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <Foto n={1} alt="Ambiente interno com estante em formato de árvore" />
          <dl data-rise="rise" className="space-y-4">
            {[['Razão social', 'Coffee & Books Cafeteria e Cultura Ltda'], ['Nome fantasia', 'Coffee & Books'], ['Setor', 'Alimentação, comércio e serviços, com atuação complementar nos segmentos cultural e de entretenimento'], ['Conceito', 'Café, leitura e convivência social em um ambiente acolhedor, confortável e propício à permanência'], ['Espaço', 'Estantes de livros, poltronas e mesas para leitura, estudo ou trabalho, com iluminação adequada']].map(([k, v]) => (
              <div key={k} className="border-l-4 border-caramel pl-4"><dt className="text-sm uppercase tracking-wide text-caramel">{k}</dt><dd className="mt-0.5 leading-relaxed">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <div id="produtos">
        <div className="mx-auto max-w-6xl px-5 pt-4"><Titulo n={4} t="Cardápio e experiências" /></div>
        <div className="mx-auto mt-8 grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <Foto n={2} alt="Vitrine de doces e tortas" />
          <div data-rise="rise" className="grid gap-8 sm:grid-cols-2">
            <div><h3 className="font-display text-2xl text-caramel">Cardápio</h3><ul className="mt-3 list-disc space-y-1.5 pl-5">{['Cafés, chás, chocolates quentes e sucos', 'Bolos, tortas e cookies', 'Sanduíches e salgados', 'Produtos sazonais e itens especiais da casa'].map((t) => <li key={t}>{t}</li>)}</ul></div>
            <div><h3 className="font-display text-2xl text-caramel">Experiências culturais</h3><ul className="mt-3 list-disc space-y-1.5 pl-5">{['Clube do livro e eventos literários', 'Encontros de leitores', 'Ações de troca e doação de livros'].map((t) => <li key={t}>{t}</li>)}</ul></div>
          </div>
        </div>
      <section id="cardapio" className="mx-auto max-w-6xl px-5 py-16">
        <h2 data-rise="page" className="font-display text-4xl text-espresso">Cardápio</h2>
        <p className="mt-3 max-w-xl">Cafés, chás, chocolates quentes, sucos, sobremesas, sanduíches e salgados. Também há produtos sazonais e itens especiais criados pela própria cafeteria.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {cardapio.map((g, i) => (
            <div key={g.grupo} data-rise="book" data-i={i}>
              <h3 className="font-display text-2xl text-caramel">{g.grupo}</h3>
              <ul className="mt-4 space-y-3">
                {g.itens.map(([n, v]) => (
                  <li key={n} className="flex items-baseline gap-2">
                    <span>{n}</span>
                    <span className="flex-1 border-b border-dotted border-latte" />
                    <span className="tabular-nums">R$ {v},00</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="cultura" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 data-rise="page" className="font-display text-4xl text-espresso">Mais que um café</h2>
          <p className="mt-3 max-w-xl">O espaço tem estantes de livros, poltronas e mesas para ler, estudar ou trabalhar, com boa iluminação e cantos para conversar. Além do cardápio, a casa promove experiências ligadas à literatura e à cultura.</p>
          <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {eventos.map(([t, q, d], i) => (
              <li key={t} data-rise="page" data-i={i} className="border-l-4 border-caramel pl-4">
                <h3 className="font-display text-xl">{t}</h3>
                <p className="text-sm text-caramel">{q}</p>
                <p className="mt-2">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Delivery />
      </div>

      <section id="publico" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={5} t="Público-alvo e localização" />
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
              {[['Público-alvo', 'Jovens e adultos, especialmente estudantes, profissionais e leitores que buscam um espaço para estudar, trabalhar, ler, conversar ou ter momentos de tranquilidade.'], ['Localização pretendida', 'Região central de São Paulo, preferencialmente próxima a instituições de ensino, escritórios, estabelecimentos comerciais e locais de grande circulação.']].map(([t, d], i) => (
                <div key={t} data-rise="page" data-i={i} className="flex gap-4 rounded-lg border border-latte bg-paper p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso font-display text-paper">{i + 1}</span>
                  <div><h3 className="font-display text-xl text-caramel">{t}</h3><p className="mt-1 leading-relaxed">{d}</p></div>
                </div>
              ))}
            </div>
            <Foto n={4} alt="Cafeteria com estantes e janelas amplas" />
          </div>
        </div>
      </section>

      <section id="diferencial" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={6} t="Diferencial competitivo" />
        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          <div data-rise="rise">
            <p className="font-display text-3xl leading-snug text-espresso">Mais que uma cafeteria: um espaço de experiências, conhecimento e permanência</p>
            <p className="mt-5">Supera o modelo tradicional de consumo rápido ao associar três eixos:</p>
            <ul className="mt-4 flex flex-wrap gap-3">{['Gastronomia', 'Literatura', 'Cultura'].map((t) => <li key={t} className="rounded-full bg-espresso px-5 py-2 font-display text-lg text-paper">{t}</li>)}</ul>
          </div>
          <Foto n={3} alt="Luminárias em forma de livros abertos" />
        </div>
      </section>

      <section id="missao" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={7} t="Missão" />
          <p data-rise="rise" className="mt-8 max-w-3xl font-display text-2xl leading-snug text-espresso">Criar uma experiência diferenciada que integre gastronomia, literatura e cultura em um mesmo espaço, com produtos de qualidade e um ambiente acolhedor, confortável e propício à permanência.</p>
          <p data-rise="rise" className="mt-4 max-w-3xl text-lg">Favorecer a criatividade, a troca de conhecimentos e a relação dos clientes com a literatura.</p>
          <Cartoes itens={[['Qualidade', 'Produtos e serviços bem cuidados.'], ['Hospitalidade', 'Ambiente acolhedor e confortável.'], ['Valorização da cultura', 'Literatura e troca de conhecimentos.']]} />
        </div>
      </section>

      <section id="juridico" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={8} t="Forma jurídica: sociedade limitada" />
        <p data-rise="rise" className="mt-8 max-w-3xl text-lg leading-relaxed">Empresa constituída por um ou mais sócios, com responsabilidade, em regra, limitada ao valor das quotas. O capital é dividido em quotas e as regras de funcionamento ficam no contrato social.</p>
        <Num itens={['Separação entre o patrimônio da empresa e o pessoal dos sócios', 'Possibilidade de diferentes participações no capital social', 'Responsabilidades e administração definidas no contrato social']} />
        <p data-rise="rise" className="mt-6 max-w-3xl">Estrutura simples e flexível, adequada a negócios em início de atividade que poderão ampliar suas operações.</p>
        <Societaria socios={socio} parte="juridico" />
      </section>

      <section id="capital" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={9} t="Capital social inicial" />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[['10 sócios', 'participação igualitária'], ['R$ 500.000,00', 'capital social inicial'], ['R$ 50.000,00', 'por sócio']].map(([v, l], i) => (
              <li key={l} data-rise="book" data-i={i} className="rounded-lg bg-espresso p-6 text-paper"><span className="block font-display text-3xl text-latte md:text-4xl">{v}</span><span className="mt-2 block text-sm">{l}</span></li>
            ))}
          </ul>
          <p data-rise="rise" className="mt-8 max-w-3xl leading-relaxed">Integralização feita pelos dez sócios no momento da constituição da sociedade, com recursos provenientes de aportes próprios, mediante patrimônio e recursos financeiros pessoais previamente constituídos.</p>
          <Societaria socios={socio} parte="capital" />
        </div>
      </section>

      <section id="socioambiental" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={10} t="Responsabilidade socioambiental" />
        <Num cols="md:grid-cols-2 lg:grid-cols-3" itens={['Copos e recipientes reutilizáveis', 'Desconto para quem traz a própria caneca', 'Redução do uso de plásticos', 'Separação adequada dos resíduos', 'Prioridade a fornecedores locais', 'Livros fora de uso doados a instituições, bibliotecas e projetos de leitura']} />
      </section>

      <section id="conclusao" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={11} t="Conclusão" />
          <p data-rise="rise" className="mt-8 max-w-3xl font-display text-2xl leading-snug text-espresso">A Coffee & Books integra alimentação, literatura e cultura em um espaço pensado para a leitura, o estudo e a convivência.</p>
          <Num itens={['Público e localização compatíveis com as demandas do mercado', 'A forma de sociedade limitada é compatível com a organização pretendida', 'Práticas socioambientais: resíduos, menos plástico e economia local']} />
        </div>
      </section>

      <div id="identidade">
        <section className="mx-auto max-w-6xl px-5 pt-16">
          <Titulo n={12} t="Identidade visual" />
          <ul data-rise="rise" className="mt-8 flex flex-wrap gap-5">
            {cores.map(([hex, nome]) => (
              <li key={hex} className="text-sm"><span style={{ background: hex }} className="block h-16 w-16 rounded-full border border-ink/10" /><span className="mt-1 block">{nome}</span><span className="block text-ink/60">{hex}</span></li>
            ))}
          </ul>
          <Marca3D />
          <p data-rise="rise" className="mt-8 text-center font-display text-2xl italic text-caramel">“Uma boa leitura começa com um bom café”</p>
        </section>
        <Produtos />
      </div>

      <section id="obrigado" className="bg-espresso px-5 py-24 text-center text-paper">
        <h2 data-rise="rise" className="font-display text-6xl font-semibold text-latte md:text-8xl">Obrigado!</h2>
        <p data-rise="rise" className="mt-4 text-lg">Coffee & Books · seu lugar entre uma página e outra</p>
      </section>

      <footer className="bg-ink px-5 py-10 text-sm text-latte">
        <div data-rise="rise" className="mx-auto max-w-6xl space-y-3">
          <p>Coffee & Books Cafeteria e Cultura Ltda. Site de demonstração, sem pedidos reais. <a href="/painel" className="underline">Painel ao vivo</a></p>
          <p>Projeto de Plano de Negócio apresentado ao Curso de Direito das Faculdades Integradas Iesgo, orientação da Profª. Liszandra Rodrigues. Formosa - GO, 2026.</p>
          <p className="text-latte/70">Referências: NASCIMENTO, Debora Minuncio. O que é Plano de Negócios?, 2020. PERIN, Nathalia. Sociedade Limitada (LTDA): o que é, como funciona, vantagens e como abrir uma empresa, 2026.</p>
        </div>
      </footer>
    </main>
  );
}

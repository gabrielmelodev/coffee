import Delivery from "../components/Delivery";
import ScrollFX from "../components/ScrollFX";
import Book3D from "../components/Book3D";
import BookStack from "../components/BookStack";
import ScrollProgress from "../components/ScrollProgress";
import Palavras from "../components/Palavras";
import Societaria from "../components/Societaria";
import Produtos from "../components/Produtos";
import Marca3D from "../components/Marca3D";

const cardapio = [
  {
    grupo: "Cafés, chás e chocolates",
    itens: [
      ["Espresso", 8],
      ["Cappuccino cremoso", 14],
      ["Café coado da casa", 10],
      ["Chá de ervas", 11],
      ["Chocolate quente", 16],
    ],
  },
  {
    grupo: "Sucos",
    itens: [
      ["Laranja", 11],
      ["Limão com hortelã", 10],
      ["Maracujá", 12],
    ],
  },
  {
    grupo: "Sobremesas",
    itens: [
      ["Bolo de cenoura", 12],
      ["Torta de frutas vermelhas", 19],
      ["Cookie de chocolate", 9],
      ["Brownie", 13],
    ],
  },
  {
    grupo: "Sanduíches e salgados",
    itens: [
      ["Sanduíche de pernil", 26],
      ["Pão de queijo", 7],
      ["Torrada com ricota", 18],
      ["Quiche do dia", 17],
    ],
  },
];

const eventos = [
  [
    "Clube do livro",
    "Toda primeira quinta, 19h",
    "Um livro por mês, uma mesa grande e café à vontade.",
  ],
  [
    "Eventos literários",
    "Datas na agenda da casa",
    "Lançamentos, saraus e conversas com quem escreve.",
  ],
  [
    "Encontro de leitores",
    "Dias 15 e 30, 18h",
    "Leitura em voz alta e conversa sobre o que cada um está lendo.",
  ],
  [
    "Troca e doação de livros",
    "Todo sábado, 10h",
    "Traga um livro, leve outro. O que sobra vai para bibliotecas parceiras.",
  ],
];

const socio = [
  "Ana Luisa Lopes Pereira",
  "Emanuelly Pereira dos Santos",
  "Fernando Francisco de Miranda Junior",
  "Gabriel Henrique Melo Xavier",
  "Hellen Paula de Assunção Branquinho",
  "Isabela Gomes Ataídes",
  "Maria Clara Oliveira Dias",
  "Maria Eduarda Filiais Pereira",
  "Tainá Dias da Costa",
  "Vitória Gonsalves Pereira dos Santos",
];

const cores = [
  ["#4B2E1A", "Espresso"],
  ["#7B4E2F", "Caramelo"],
  ["#D7C2A3", "Latte"],
  ["#EFE7D9", "Papel"],
  ["#1A1A1A", "Tinta"],
];

const socioambiental = [
  "Copos e recipientes reutilizáveis, com desconto para quem traz a própria caneca.",
  "Menos materiais plásticos e separação correta dos resíduos gerados.",
  "Preferência por fornecedores locais: valoriza a economia da região e reduz o impacto do transporte.",
  "Livros que saem de uso vão para instituições, bibliotecas ou projetos de incentivo à leitura.",
];

const roteiro = [
  ["Empresa", "empresa"],
  ["Plano de negócios", "plano"],
  ["Conceito", "conceito"],
  ["Produtos e serviços", "produtos"],
  ["Público e localização", "publico"],
  ["Diferencial", "diferencial"],
  ["Missão e valores", "missao"],
  ["Estrutura jurídica", "juridico"],
  ["Capital social", "capital"],
  ["Socioambiental e conclusão", "socioambiental"],
];

function Titulo({ n, t }) {
  return (
    <div
      data-rise="page"
      className="flex items-baseline gap-4 border-b border-latte pb-3"
    >
      <span className="font-display text-5xl tabular-nums text-caramel/60">
        {String(n).padStart(2, "0")}
      </span>
      <h2 className="font-display text-3xl font-semibold text-espresso md:text-4xl">
        {t}
      </h2>
    </div>
  );
}

const Cartoes = ({ itens, cols = "md:grid-cols-3" }) => (
  <ul className={`mt-8 grid gap-6 ${cols}`}>
    {itens.map(([t, d], i) => (
      <li
        key={t}
        data-rise="book"
        data-i={i}
        className="rounded-lg border border-latte bg-paper p-5"
      >
        <h3 className="font-display text-xl text-caramel">{t}</h3>
        <p className="mt-2 leading-relaxed">{d}</p>
      </li>
    ))}
  </ul>
);

export default function Home() {
  return (
    <main>
      <div className="bg-ink px-5 py-2 text-center text-xs text-latte">
        Projeto acadêmico de Direito Empresarial. Site de demonstração, sem
        pedidos reais.
      </div>
      <ScrollFX />
      <BookStack />
      <ScrollProgress />
      <header className="sticky top-0 z-10 border-b border-latte bg-paper/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a
            href="#"
            className="font-display text-xl font-semibold text-espresso"
          >
            Coffee & Books
          </a>
          <div className="flex gap-4 text-sm md:gap-5">
            <a href="#conceito" className="hidden hover:text-caramel md:inline">
              Conceito
            </a>
            <a href="#produtos" className="hover:text-caramel">
              Produtos
            </a>
            <a href="#juridico" className="hover:text-caramel">
              Jurídico
            </a>
            <a href="#capital" className="hidden hover:text-caramel md:inline">
              Capital
            </a>
            <a
              href="#delivery"
              className="rounded-full bg-espresso px-4 py-1.5 text-paper hover:bg-caramel"
            >
              Delivery
            </a>
          </div>
        </nav>
      </header>

      <section
        id="empresa"
        className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24"
      >
        <div>
          <p className="entra text-caramel" style={{ "--i": 0 }}>
            Café & Livraria
          </p>
          <Palavras
            as="h1"
            className="mt-2 font-display text-5xl font-semibold leading-[1.05] text-espresso md:text-7xl"
            texto="seu lugar entre uma página e outra"
            atraso={1}
          />
          <p
            className="entra mt-6 max-w-md text-lg text-ink/80"
            style={{ "--i": 7 }}
          >
            Boa leitura começa com um bom café. Fique o tempo que a leitura
            pedir, na região central de Formosa - GO.
          </p>
          <div className="entra mt-8 flex flex-wrap gap-3" style={{ "--i": 9 }}>
            <a
              href="#cardapio"
              className="rounded-full bg-espresso px-6 py-3 font-medium text-paper hover:bg-caramel"
            >
              Ver cardápio
            </a>
            <a
              href="#delivery"
              className="rounded-full border border-espresso px-6 py-3 font-medium text-espresso hover:bg-latte/50"
            >
              Pedir delivery
            </a>
          </div>
        </div>
        <Book3D />
      </section>

      <div
        aria-hidden
        className="faixa overflow-hidden border-y border-espresso bg-espresso py-3 text-latte"
      >
        <div className="faixa-trilho font-display text-lg italic">
          {[0, 1].map((n) => (
            <span key={n} className="flex shrink-0 gap-8 pr-8">
              {[
                "Café coado da casa",
                "Clube do livro",
                "Troca de livros todo sábado",
                "Sobremesas feitas na casa",
                "Delivery",
                "Leitura com calma",
              ].map((t) => (
                <span key={t} className="flex items-center gap-8">
                  {t}
                  <span className="text-caramel">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <nav
        aria-label="Roteiro da apresentação"
        className="mx-auto max-w-6xl px-5 pt-12"
      >
        <p className="text-sm uppercase tracking-[.25em] text-caramel">
          Roteiro da apresentação
        </p>
        <ol className="mt-4 flex flex-wrap gap-2">
          {roteiro.map(([t, id], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-center gap-2 rounded-full border border-latte bg-paper px-3 py-1.5 text-sm hover:border-caramel hover:text-caramel"
              >
                <span className="font-display text-caramel">{i + 1}</span>
                {t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="quem-somos" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={1} t="Apresentação da empresa" />
        <div data-rise="rise" className="mt-8 grid gap-10 md:grid-cols-2">
          <dl className="space-y-4">
            {[
              ["Razão social", "Coffee & Books Cafeteria e Cultura Ltda"],
              ["Nome fantasia", "Coffee & Books"],
              ["Slogan", "seu lugar entre uma página e outra"],
              [
                "Atuação",
                "Alimentação, comércio e serviços, com atuação complementar nos segmentos cultural e de entretenimento.",
              ],
            ].map(([k, v]) => (
              <div key={k} className="border-l-4 border-caramel pl-4">
                <dt className="text-sm text-caramel">{k}</dt>
                <dd className="font-display text-xl">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="font-display text-2xl text-caramel">
              Quem somos: os dez sócios
            </h3>
            <ul className="mt-4 columns-1 gap-8 space-y-1 sm:columns-2">
              {socio.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-2xl text-caramel">
              Cores da marca
            </h3>
            <ul className="mt-4 flex flex-wrap gap-4">
              {cores.map(([hex, nome]) => (
                <li key={hex} className="text-sm">
                  <span
                    style={{ background: hex }}
                    className="block h-12 w-12 rounded-full border border-ink/10"
                  />
                  <span className="mt-1 block">{nome}</span>
                  <span className="block text-ink/60">{hex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Marca3D />
      </section>

      <section id="plano" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={2} t="Importância do plano de negócios" />
          <p
            data-rise="rise"
            className="mt-8 max-w-3xl text-lg leading-relaxed"
          >
            O plano de negócios é uma ferramenta de gestão. Ele dá uma visão
            ampla do empreendimento, ajuda a identificar riscos, reduz erros e
            apoia as estratégias que aumentam as chances de sucesso. Este plano
            analisou a implantação, o funcionamento e o posicionamento da Coffee
            & Books no mercado.
          </p>
          <Cartoes
            itens={[
              [
                "Visão abrangente",
                "Mostra o negócio inteiro, da ideia à operação.",
              ],
              [
                "Menos riscos e erros",
                "Permite enxergar os riscos antes que virem problema.",
              ],
              [
                "Estratégias",
                "Apoia decisões que aumentam as chances de sucesso.",
              ],
            ]}
          />
        </div>
      </section>

      <section id="conceito" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={3} t="Conceito do empreendimento" />
        <p data-rise="rise" className="mt-8 max-w-3xl text-lg leading-relaxed">
          A ideia é juntar, no mesmo lugar, o prazer de um bom café, o prazer da
          leitura e a convivência social. Com o slogan “seu lugar entre uma
          página e outra”, a casa quer ser um ambiente acolhedor, confortável e
          feito para ficar, e não um lugar de consumo rápido.
        </p>
        <Cartoes
          itens={[
            [
              "Cafeteria",
              "Cafés, chás, chocolates quentes, sucos, sobremesas e salgados de qualidade.",
            ],
            [
              "Literatura",
              "Estantes, clube do livro, eventos literários e troca de livros.",
            ],
            [
              "Convivência social",
              "Mesas, poltronas e cantos para conversar, estudar, trabalhar ou descansar.",
            ],
          ]}
        />
        <p className="mt-10 max-w-3xl">
          O espaço terá estantes de livros, poltronas, mesas para leitura,
          estudo ou trabalho, boa iluminação e áreas de interação entre os
          frequentadores.
        </p>
        <div data-rise="rise" className="mt-10">
          <h3 className="font-display text-2xl text-caramel">O espaço</h3>
          <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>
                <img
                  src={`/img/ambiente-${n}.jpg`}
                  alt={`Ilustração de ambiente interno ${n}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-md object-cover shadow-md transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.02]"
                />
                <p className="mt-2 text-xs text-ink/60">
                  Ilustração de ambiente interno {n}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div id="produtos">
        <div className="mx-auto max-w-6xl px-5 pt-16">
          <Titulo n={4} t="Produtos e serviços" />
        </div>
        <section id="cardapio" className="mx-auto max-w-6xl px-5 py-16">
          <h2 data-rise="page" className="font-display text-4xl text-espresso">
            Cardápio
          </h2>
          <p className="mt-3 max-w-xl">
            Cafés, chás, chocolates quentes, sucos, sobremesas, sanduíches e
            salgados. Também há produtos sazonais e itens especiais criados pela
            própria cafeteria.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {cardapio.map((g, i) => (
              <div key={g.grupo} data-rise="book" data-i={i}>
                <h3 className="font-display text-2xl text-caramel">
                  {g.grupo}
                </h3>
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
            <h2
              data-rise="page"
              className="font-display text-4xl text-espresso"
            >
              Mais que um café
            </h2>
            <p className="mt-3 max-w-xl">
              O espaço tem estantes de livros, poltronas e mesas para ler,
              estudar ou trabalhar, com boa iluminação e cantos para conversar.
              Além do cardápio, a casa promove experiências ligadas à literatura
              e à cultura.
            </p>
            <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {eventos.map(([t, q, d], i) => (
                <li
                  key={t}
                  data-rise="page"
                  data-i={i}
                  className="border-l-4 border-caramel pl-4"
                >
                  <h3 className="font-display text-xl">{t}</h3>
                  <p className="text-sm text-caramel">{q}</p>
                  <p className="mt-2">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Produtos />

        <Delivery />
      </div>

      <section id="publico" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={5} t="Público-alvo e localização" />
        <Cartoes
          cols="md:grid-cols-2"
          itens={[
            [
              "Para quem",
              "Jovens e adultos, especialmente estudantes, profissionais e leitores que buscam um lugar tranquilo para estudar, trabalhar, ler, conversar ou descansar.",
            ],
            [
              "Onde",
              "Região central de Formosa - GO, de preferência perto de instituições de ensino, escritórios, comércio e locais de grande circulação.",
            ],
          ]}
        />
      </section>

      <section id="diferencial" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={6} t="Diferencial competitivo" />
          <p
            data-rise="rise"
            className="mt-8 max-w-3xl font-display text-2xl leading-snug text-espresso"
          >
            Ir além da cafeteria tradicional: unir gastronomia, literatura e
            cultura num espaço de experiências, conhecimento e permanência.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div
              data-rise="page"
              className="rounded-lg border border-latte bg-paper p-6"
            >
              <h3 className="font-display text-xl text-ink/60">
                Cafeteria tradicional
              </h3>
              <p className="mt-2">
                Foco na oferta gastronômica e no consumo rápido.
              </p>
            </div>
            <div
              data-rise="page"
              data-i="1"
              className="rounded-lg bg-espresso p-6 text-paper"
            >
              <h3 className="font-display text-xl text-latte">
                Coffee & Books
              </h3>
              <p className="mt-2">
                Gastronomia, literatura e cultura juntas, com clube do livro,
                eventos e troca de livros, num espaço para ficar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="missao" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={7} t="Missão e valores" />
        <p data-rise="rise" className="mt-8 max-w-3xl text-lg leading-relaxed">
          <strong className="font-display text-caramel">Missão: </strong>criar
          uma experiência que reúne gastronomia, literatura e cultura em um
          mesmo espaço, com produtos de qualidade e um ambiente acolhedor,
          confortável e propício à permanência. A casa quer favorecer a
          criatividade, a troca de conhecimentos e a aproximação dos clientes
          com a literatura.
        </p>
        <Cartoes
          itens={[
            [
              "Qualidade",
              "Produtos e serviços bem cuidados, do café ao atendimento.",
            ],
            [
              "Hospitalidade",
              "Ambiente acolhedor, confortável e propício à permanência.",
            ],
            [
              "Valorização da cultura",
              "Literatura, troca de conhecimentos e convivência como parte do negócio.",
            ],
          ]}
        />
      </section>

      <section id="juridico" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={8} t="Estrutura jurídica" />
          <p data-rise="rise" className="mt-8 max-w-3xl leading-relaxed">
            A sociedade limitada é formada por um ou mais sócios. Em regra, a
            responsabilidade de cada um fica limitada ao valor de suas quotas. O
            capital é dividido em quotas, e a administração e as regras de
            funcionamento ficam no contrato social. É um modelo simples e
            flexível, muito usado por pequenos e médios negócios, e permite
            crescer depois.
          </p>
          <Cartoes
            itens={[
              [
                "Patrimônio separado",
                "O patrimônio da empresa não se confunde com o pessoal dos sócios.",
              ],
              [
                "Participações flexíveis",
                "É possível definir participações diferentes no capital social.",
              ],
              [
                "Regras no contrato",
                "Responsabilidades e administração ficam definidas no contrato social.",
              ],
            ]}
          />
          <Societaria socios={socio} parte="juridico" />
        </div>
      </section>

      <section id="capital" className="mx-auto max-w-6xl px-5 py-16">
        <Titulo n={9} t="Capital social" />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["R$ 500.000,00", "Capital social inicial"],
            ["10 sócios", "Participação igual, de 10% cada"],
            ["R$ 50.000,00", "Contribuição de cada sócio"],
          ].map(([v, l], i) => (
            <li
              key={l}
              data-rise="book"
              data-i={i}
              className="rounded-lg bg-espresso p-6 text-paper"
            >
              <span className="block font-display text-3xl text-latte md:text-4xl">
                {v}
              </span>
              <span className="mt-2 block text-sm">{l}</span>
            </li>
          ))}
        </ul>
        <p data-rise="rise" className="mt-8 max-w-3xl leading-relaxed">
          O capital serve para implantar e estruturar o negócio. Os dez sócios
          integralizam o valor de forma igualitária na constituição da
          sociedade, com patrimônio e recursos financeiros pessoais já
          constituídos.
        </p>
        <Societaria socios={socio} parte="capital" />
      </section>

      <section id="socioambiental" className="bg-latte/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Titulo n={10} t="Responsabilidade socioambiental e conclusão" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {socioambiental.map((t) => (
              <li
                key={t}
                data-rise="rise"
                className="border-l-4 border-caramel pl-4"
              >
                {t}
              </li>
            ))}
          </ul>
          <div
            data-rise="rise"
            className="mt-12 rounded-lg bg-espresso p-8 text-paper"
          >
            <h3 className="font-display text-2xl text-latte">Conclusão</h3>
            <p className="mt-3 max-w-3xl leading-relaxed">
              A proposta é estruturada e une alimentação, literatura e cultura
              num espaço para consumir, ler, estudar e conviver. A forma
              societária limitada combina com a organização pretendida, e as
              práticas socioambientais mostram o cuidado com resíduos, com o
              consumo de materiais e com a economia local.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-ink px-5 py-10 text-sm text-latte">
        <div data-rise="rise" className="mx-auto max-w-6xl space-y-3">
          <p>
            Coffee & Books Cafeteria e Cultura Ltda. Site de demonstração, sem
            pedidos reais.{" "}
            <a href="/painel" className="underline">
              Painel ao vivo
            </a>
          </p>
          <p>
            Projeto de Plano de Negócio apresentado ao Curso de Direito das
            Faculdades Integradas Iesgo, orientação da Profª. Liszandra
            Rodrigues. Formosa - GO, 2026.
          </p>
          <p className="text-latte/70">
            Referências: NASCIMENTO, Debora Minuncio. O que é Plano de
            Negócios?, 2020. PERIN, Nathalia. Sociedade Limitada (LTDA): o que
            é, como funciona, vantagens e como abrir uma empresa, 2026.
          </p>
        </div>
      </footer>
    </main>
  );
}

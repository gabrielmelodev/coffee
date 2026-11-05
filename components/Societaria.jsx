// Estrutura societária conforme o plano de negócios (sociedade limitada, 10 sócios, capital de R$ 500.000,00).
// parte="capital": participação dos sócios. parte="juridico": como a sociedade funciona.
const pontos = [
  ['Quotas', 'O capital se divide em dez quotas iguais de R$ 50.000,00, integralizadas na constituição da sociedade (Código Civil, art. 1.055).'],
  ['Responsabilidade', 'Em regra, cada sócio responde até o valor de suas quotas, mas todos respondem solidariamente pela integralização do capital social (art. 1.052).'],
  ['Patrimônio separado', 'O patrimônio da empresa não se confunde com o patrimônio pessoal dos sócios.'],
  ['Administração', 'Quem administra e as regras de funcionamento ficam no contrato social (arts. 997 e 1.060).'],
];

export default function Societaria({ socios, parte }) {
  return (
    <div data-rise="rise" className="mt-10">
      {parte === 'capital' && (
        <>
          <h3 className="font-display text-2xl text-caramel">Participação dos sócios</h3>
          <div aria-hidden className="mt-4 flex h-4 overflow-hidden rounded-full border border-espresso/30">
            {socios.map((n, i) => <span key={n} className={`flex-1 ${i % 2 ? 'bg-caramel' : 'bg-espresso'} ${i ? 'border-l border-paper/60' : ''}`} />)}
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {socios.map((n) => (
              <li key={n} className="rounded-md border border-latte bg-paper p-3 text-sm">
                <span className="block leading-snug">{n}</span>
                <span className="mt-1 block text-caramel">10% · R$ 50.000,00</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {parte === 'juridico' && (
        <>
          <h3 className="font-display text-2xl text-caramel">Como a sociedade funciona</h3>
          <dl className="mt-5 grid gap-6 md:grid-cols-2">
            {pontos.map(([t, d]) => (
              <div key={t} className="border-l-4 border-caramel pl-4">
                <dt className="font-display text-lg">{t}</dt>
                <dd className="mt-1 leading-relaxed">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-ink/60">Base legal: Código Civil (Lei 10.406/2002), arts. 1.052 a 1.087. Esquema ilustrativo do plano de negócios; não substitui o contrato social.</p>
        </>
      )}
    </div>
  );
}

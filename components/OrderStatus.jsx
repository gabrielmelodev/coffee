import { STEPS, brl, fmtKm } from '../lib/timeline';

const PADRAO = { nome: 'Rafael S.', moto: 'Honda CG 160', placa: 'RFS-4F21' };

export default function OrderStatus({ pedido, stage, eta, kmRestante = 0, chegada, mostrarItens = false }) {
  const m = pedido.motoboy ?? PADRAO;
  const hora = chegada ? chegada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : null;
  return (
    <>
      {stage === 3 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} className="folha-cai" style={{ '--x': `${((i * 53) % 80) - 40}%`, '--dx': `${((i * 29) % 120) - 60}px`, '--r': `${((i * 97) % 720) - 360}deg`, '--d': `${(i % 6) * 0.08}s`, '--c': ['#4B2E1A', '#7B4E2F', '#D7C2A3'][i % 3] }} />
          ))}
        </div>
      )}
      <h3 className="font-display text-2xl">Pedido #{pedido.id}</h3>
      <p className="text-sm text-caramel">{pedido.nome}</p>
      <p className="mt-1 text-sm text-caramel" aria-live="polite">
        {stage === 3 ? 'Entregue. Boa leitura!' : `Chega em cerca de ${eta} min${hora ? ` (às ${hora})` : ''}`}
      </p>
      {mostrarItens && (
        <ul className="mt-4 space-y-1 border-y border-latte py-3 text-sm">
          {pedido.itens.map((i) => (
            <li key={i.nome} className="flex justify-between"><span>{i.qtd}× {i.nome}</span><span>{brl(i.qtd * i.preco)}</span></li>
          ))}
          <li className="flex justify-between pt-1 font-semibold"><span>Total</span><span>{brl(pedido.total)}</span></li>
        </ul>
      )}
      <ol className="mt-6">
        {STEPS.map((s, i) => {
          const feito = i < stage || stage === 3, atual = i === stage && stage < 3;
          return (
            <li key={s} className="relative flex items-center gap-3 pb-5 last:pb-0">
              {i < STEPS.length - 1 && (
                <span aria-hidden className="absolute left-[13px] top-7 h-[calc(100%-1.75rem)] w-0.5 bg-latte">
                  <span className={`block h-full w-full origin-top bg-espresso transition-transform duration-700 ${feito ? 'scale-y-100' : 'scale-y-0'}`} />
                </span>
              )}
              <span key={feito ? 'f' : atual ? 'a' : 'n'} className={`relative grid h-7 w-7 place-items-center rounded-full text-sm ${feito ? 'pop bg-espresso text-paper' : atual ? 'anel-atual border-2 border-espresso bg-latte' : 'border border-latte'}`}>
                {feito ? '✓' : i + 1}
              </span>
              <span className={feito || atual ? 'font-medium' : 'text-ink/40'}>{s}</span>
            </li>
          );
        })}
      </ol>
      {stage >= 1 && (
        <div className="entra mt-6 flex items-center gap-3 rounded-md bg-latte/50 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-lg" aria-hidden>🛵</span>
          <div>
            <p className="font-medium">{m.nome}</p>
            <p className="text-sm text-caramel">{m.moto}, placa {m.placa}</p>
            <p className="text-sm text-caramel" aria-live="polite">
              {stage === 1 ? 'Esperando o pedido ficar pronto' : stage === 2 ? `A ${fmtKm(kmRestante)} de você` : 'Entrega concluída'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

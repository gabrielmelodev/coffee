// Título cujas palavras sobem uma a uma, como se saíssem da página.
export default function Palavras({ texto, as: Tag = 'span', className, atraso = 0 }) {
  const palavras = texto.split(' ');
  return (
    <Tag className={className} aria-label={texto}>
      {palavras.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="palavra"><span style={{ '--i': i + atraso }}>{w}</span></span>
          {i < palavras.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

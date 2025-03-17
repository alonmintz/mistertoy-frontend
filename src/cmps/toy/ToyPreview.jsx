export function ToyPreview({ toy }) {
  const { imgUrl, name, price, inStock } = toy;
  return (
    <article className="toy-preview">
      <img src={imgUrl} alt="toy image" />
      <h2>{name}</h2>
      <div>
        <span>{`Price: ${price}$ `}</span>
        {inStock ? <span>in stock 😎</span> : <span>not in stock 😥</span>}
      </div>
    </article>
  );
}

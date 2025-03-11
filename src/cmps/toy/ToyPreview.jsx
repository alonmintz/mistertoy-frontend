export function ToyPreview({ toy }) {
  const { inStock } = toy;
  return (
    <article className="toy-preview">
      <img src={toy.imgUrl} alt="toy image" />
      <h4>{toy.name}</h4>
      <div>
        <span>{`Price: ${toy.price}$ `}</span>
        {inStock ? <span>in stock 😎</span> : <span>not in stock 😥</span>}
      </div>
    </article>
  );
}

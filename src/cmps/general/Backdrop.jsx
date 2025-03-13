export function Backdrop({ onClick, children }) {
  return (
    <section className="backdrop" onClick={onClick}>
      {children}
    </section>
  );
}

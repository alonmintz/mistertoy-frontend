export function Popup({ header, footer, children }) {
  return (
    <section className="popup">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </section>
  );
}

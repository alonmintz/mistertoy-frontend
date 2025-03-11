import { Link } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="content header-container">
        <h4>Mister Toy</h4>
        <Link to={"/"}>Home</Link>
        <Link to={"/toy"}>Toys</Link>
      </section>
    </header>
  );
}

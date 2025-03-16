import { useEffect, useState } from "react";
import mockImg from "../assets/img/mock-img.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../service/toy.service";
import { showErrorMsg } from "../service/event-bus.service";
export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadToy();
  }, [params.toyId]);

  function loadToy() {
    toyService
      .get(params.toyId)
      .then(setToy)
      .catch((err) => {
        console.log({ err });
        showErrorMsg("Error loading toy");
        navigate("/toy");
      });
  }

  if (!toy) return <section className="loader"> Loading...</section>;
  const { name, labels, price, imgUrl, inStock } = toy;
  //TODO: add "you may also like" section by labels
  //TODO: add cart functionality
  return (
    <section className="toy-details">
      <nav className="toy-nav">
        <Link className="btn" to={`/toy/${toy.prevToyId}`}>
          previous toy
        </Link>
        <Link className="btn" to={`/toy/${toy.nextToyId}`}>
          next toy
        </Link>
      </nav>
      <section className="toy-container">
        <article className="img-container">
          <img src={mockImg} alt="toy-img" />
          {!inStock && <h2>Sold Out</h2>}
        </article>
        <article className="details">
          <h2>{name}</h2>
          <h4>{`Price: ${price}$`}</h4>
          <ul className="clean-list">
            {labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <button className="btn">Add To Cart</button>
        </article>
      </section>
      <h2>You May Also Like:</h2>
    </section>
  );
}

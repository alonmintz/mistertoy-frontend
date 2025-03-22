import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../service/toy.service";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { Popup } from "../cmps/general/Popup";
import { Chat } from "../cmps/general/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faArrowRight,
  faArrowLeft,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import { ToyList } from "../cmps/toy/ToyList";
import { cartActions } from "../store/actions/cart.actions";

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const [relatedToys, setRelatedToys] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadToy();
  }, [params.toyId]);

  useEffect(() => {
    if (toy) loadRelatedToys();
  }, [toy]);

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setIsPopupOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

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

  function loadRelatedToys() {
    toyService.getRelatedToysByLabels(toy.labels, toy._id).then(setRelatedToys);
  }

  function toggleIsPopupOpen() {
    setIsPopupOpen((prev) => !prev);
  }

  function onAddToCart(ev) {
    ev.preventDefault();
    cartActions.addCartItem(toy).then(showSuccessMsg);
  }

  if (!toy) return <section className="loader"> Loading...</section>;
  const { name, labels, price, imgUrl, inStock } = toy;

  return (
    <section className="toy-details">
      <nav>
        <Link className="btn btn-icon" to={`/toy`}>
          <FontAwesomeIcon icon={faGrip} />{" "}
        </Link>
        <div className="toy-nav">
          <Link className="btn btn-icon" to={`/toy/${toy.prevToyId}`}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <Link className="btn btn-icon" to={`/toy/${toy.nextToyId}`}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </nav>
      <section className="toy-container">
        <article className="img-container">
          <img src={imgUrl} alt="toy-img" />
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
          <h4>Description:</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore id
            consequuntur fuga officiis, libero doloremque iure. Fugit inventore
            deleniti quas reiciendis? Numquam quos eius inventore iste ipsum
            architecto minus saepe.
          </p>
          <button className="btn" onClick={onAddToCart} disabled={!toy.inStock}>
            Add To Cart
          </button>
        </article>
      </section>
      {relatedToys && (
        <section className="related-toys-container">
          <h2>You May Also Like:</h2>
          {relatedToys.map((toysByLabelObj) => {
            const { label, toys } = toysByLabelObj;
            return (
              <section key={label} className="related-toys-by-label">
                <h4>{label}</h4>
                <ToyList toys={toys} />
              </section>
            );
          })}
        </section>
      )}
      <button className="btn chat-btn" onClick={toggleIsPopupOpen}>
        <FontAwesomeIcon icon={faComment} />
      </button>
      {isPopupOpen && (
        <Popup
          header={<span>Need Help?</span>}
          footer={<span>Press Esc to close chat</span>}
        >
          <Chat />
        </Popup>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../service/toy.service";
import { showErrorMsg } from "../service/event-bus.service";
import { Popup } from "../cmps/general/Popup";
import { Chat } from "../cmps/general/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { ToyList } from "../cmps/toy/ToyList";

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
    console.log({ relatedToys });
  }, [relatedToys]);

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
          <button className="btn">Add To Cart</button>
        </article>
      </section>
      {relatedToys && (
        <section className="related-toys-container">
          <h2>You May Also Like...</h2>
          {relatedToys.map((toysByLabelObj) => {
            const { label, toys } = toysByLabelObj;
            return (
              <section className="related-toys-by-label">
                <h4>{label}:</h4>
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

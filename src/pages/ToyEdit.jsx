import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../cmps/general/Modal";
import { useEffect, useState } from "react";
import { TOY_LABELS, toyService } from "../service/toy.service";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { toyActions } from "../store/actions/toy.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.toyId) {
      loadToy();
    } else {
      setToyToEdit(toyService.getEmptyToy());
    }
  }, []);

  function loadToy() {
    setIsLoading(true);
    toyService
      .get(params.toyId)
      .then(setToyToEdit)
      .then(() => setIsLoading(false))
      .catch((err) => {
        showErrorMsg(`Failed Loading toy (id: ${params.toyId})`);
      });
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setToyToEdit((prevToyToEdit) => ({ ...prevToyToEdit, [field]: value }));
  }

  function handleLabelClick(label) {
    console.log(`${label} clicked`);
    if (labels.includes(label)) {
      setToyToEdit((prevToyToEdit) => ({
        ...prevToyToEdit,
        labels: labels.filter((prevLabel) => prevLabel !== label),
      }));
    } else {
      setToyToEdit((prevToyToEdit) => ({
        ...prevToyToEdit,
        labels: [label, ...labels],
      }));
    }
  }

  function onSubmit(ev) {
    ev.preventDefault();
    console.log({ toyToEdit });

    toyActions
      .saveToy(toyToEdit)
      .then((savedToy) => {
        navigate("/toy");
        showSuccessMsg(`Toy Saved Successfully (id: ${savedToy._id})`);
      })
      .catch((err) => {
        showErrorMsg("Cannot save toy");
        console.log("err:", err);
      });
  }

  if (!toyToEdit)
    return (
      <Modal onClose={() => navigate("/toy")}>
        <section className="toy-edit">
          <section className="loader"> Loading...</section>
        </section>
      </Modal>
    );

  const { name, labels, price, inStock, imgUrl } = toyToEdit;

  return (
    <Modal onClose={() => navigate("/toy")}>
      <section className="toy-edit">
        <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>
        <form onSubmit={onSubmit}>
          <div className="container">
            <div className="edit-inputs">
              <label htmlFor="name">
                <span>Name: </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  disabled={isLoading}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="imgUrl">
                <span>Image URL: </span>
                <input
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  value={imgUrl}
                  disabled={isLoading}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="price">
                <span>Price: </span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  min={0}
                  disabled={isLoading}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="inStock">
                <span>In Stock: </span>
                <input
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  value={inStock}
                  checked={inStock}
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </label>
            </div>
            {/* <h4>Labels:</h4> */}
            <ul className="labels-list clean-list">
              {TOY_LABELS.map((label) => (
                <li key={label}>
                  <ToyLabel
                    toy={toyToEdit}
                    label={label}
                    onLabelClick={handleLabelClick}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button className="btn">Save</button>
        </form>
      </section>
    </Modal>
  );
}

function ToyLabel({ toy, label, onLabelClick }) {
  const isIncluded = toy.labels.includes(label);

  return (
    <section
      className={`toy-label ${isIncluded ? "included" : ""}`}
      onClick={() => onLabelClick(label)}
    >
      <span>
        {label}{" "}
        {isIncluded ? (
          <FontAwesomeIcon icon={faMinus} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </span>
    </section>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../cmps/general/Modal";
import { useEffect, useState } from "react";
import { TOY_LABELS, toyService } from "../service/toy.service";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { toyActions } from "../store/actions/toy.actions";

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const { name, labels, price, inStock } = toyToEdit;

  useEffect(() => {
    if (params.toyId) {
      loadToy();
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

  return (
    <Modal onClose={() => navigate("/toy")}>
      <section className="toy-edit">
        <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>
        <form onSubmit={onSubmit}>
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
          <h4>Labels:</h4>
          <ul className="clean-list">
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
          <button>Save</button>
        </form>
      </section>
    </Modal>
  );
}

function ToyLabel({ toy, label, onLabelClick }) {
  function checkToyLabels() {
    return toy.labels.includes(label);
  }

  return (
    <section className="toy-label" onClick={() => onLabelClick(label)}>
      <span>
        {label} {checkToyLabels() ? "X" : "+"}
      </span>
    </section>
  );
}

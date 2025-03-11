import { useEffect, useRef, useState } from "react";
import { utilService } from "../../service/util.service";
import { TOY_LABELS, toyService } from "../../service/toy.service";

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const debounceOnSetFilterBy = useRef(
    utilService.debounce(onSetFilterBy, 500)
  ).current;

  useEffect(() => {
    console.log({ filterByToEdit });

    debounceOnSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function toggleDropdown() {
    setIsDropDownOpen((prev) => !prev);
  }

  function handleCheckboxChange(label) {
    console.log({ label });
    setFilterByToEdit((prevFilter) =>
      prevFilter.labels.includes(label)
        ? {
            ...filterByToEdit,
            labels: prevFilter.labels.filter((value) => value !== label),
          }
        : { ...filterByToEdit, labels: [...prevFilter.labels, label] }
    );
  }

  function resetFilterByToEdit() {
    setFilterByToEdit(toyService.getDefaultFilter());
  }

  const { txt, labels, inStock } = filterByToEdit;

  return (
    <section className="toy-filter">
      <form>
        <div className="filter-item">
          <input
            value={txt}
            onChange={handleChange}
            type="search"
            placeholder="By Text"
            id="txt"
            name="txt"
          />
        </div>
        <div className="filter-item">
          <div
            onClick={toggleDropdown}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {labels.length > 0 ? labels.join(", ") : "Select labels"}
            {isDropDownOpen && (
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginTop: "5px",
                  position: "absolute",
                  backgroundColor: "white",
                  zIndex: 1,
                }}
              >
                {TOY_LABELS.map((label) => (
                  <div key={label}>
                    <label>
                      <input
                        type="checkbox"
                        checked={labels.includes(label)}
                        onChange={(ev) => {
                          ev.stopPropagation();
                          handleCheckboxChange(label);
                        }}
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="filter-item">
          <label htmlFor="isDone">Availability: </label>
          <select
            name="inStock"
            id="inStock"
            value={inStock || ""}
            onChange={handleChange}
          >
            <option value={""}>All</option>
            <option value={true}>In Stock</option>
            <option value={false}>Sold Out</option>
          </select>
        </div>
        <button type="button" onClick={resetFilterByToEdit}>
          Reset
        </button>
      </form>
    </section>
  );
}

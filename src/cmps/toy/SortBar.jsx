import { useEffect, useRef, useState } from "react";
import { utilService } from "../../service/util.service";
import { Link } from "react-router-dom";

export function SortBar({ sortBy, onSetSortBy, onToggleFilter }) {
  const [sortByToEdit, setSortByToEdit] = useState(sortBy);
  const debounceSetSortBy = useRef(
    utilService.debounce(onSetSortBy, 500)
  ).current;

  useEffect(() => {
    debounceSetSortBy(sortByToEdit);
  }, [sortByToEdit]);

  const key = Object.keys(sortByToEdit)[0];
  const reverseValue = sortByToEdit[key];

  function handleSortChange({ target }) {
    const field = target.value;

    setSortByToEdit({ [field]: reverseValue });
  }

  function handleReverseChange({ target }) {
    const newValue = target.checked ? -1 : 1;
    setSortByToEdit({ [key]: newValue });
  }

  return (
    <section className="content sort-bar">
      <div className="sort">
        <label htmlFor="sortBy">
          <span>Sort By:</span>
          <select
            name="sortBy"
            id="sortBy"
            onChange={handleSortChange}
            value={key || ""}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Creation</option>
          </select>
        </label>
        <label htmlFor="reverse">
          <span>reverse:</span>
          <input
            id="reverse"
            type="checkbox"
            checked={reverseValue === -1}
            onChange={handleReverseChange}
          />
        </label>
      </div>
      <button onClick={onToggleFilter}>filter</button>
      <Link className="btn" to={"/toy/edit"}>
        Add Toy
      </Link>
    </section>
  );
}

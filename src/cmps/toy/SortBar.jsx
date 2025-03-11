import { useEffect, useRef, useState } from "react";
import { utilService } from "../../service/util.service";

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
      <label htmlFor="sortBy">Sort: </label>
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
      <label htmlFor="reverse">reverse: </label>
      <input
        id="reverse"
        type="checkbox"
        checked={reverseValue === -1}
        onChange={handleReverseChange}
      />
      <button onClick={onToggleFilter}>filter</button>
    </section>
  );
}

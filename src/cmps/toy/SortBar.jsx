import { useEffect, useRef, useState } from "react";
import { utilService } from "../../service/util.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpZA,
  faArrowDownAZ,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faArrowDown19,
  faArrowUp91,
  faSliders,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

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

  function renderSortIcon() {
    switch (key) {
      case "name":
        return reverseValue === -1 ? (
          <FontAwesomeIcon icon={faArrowUpZA} size="xl" />
        ) : (
          <FontAwesomeIcon icon={faArrowDownAZ} size="xl" />
        );
      case "price":
        return reverseValue === -1 ? (
          <FontAwesomeIcon icon={faArrowUp91} size="xl" />
        ) : (
          <FontAwesomeIcon icon={faArrowDown19} size="xl" />
        );
      case "createdAt":
        return reverseValue === -1 ? (
          <FontAwesomeIcon icon={faArrowUpWideShort} size="xl" />
        ) : (
          <FontAwesomeIcon icon={faArrowDownShortWide} size="xl" />
        );

      default:
        break;
    }
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
          <span>{renderSortIcon()}</span>
          <input
            id="reverse"
            type="checkbox"
            checked={reverseValue === -1}
            onChange={handleReverseChange}
          />
        </label>
      </div>
      <button onClick={onToggleFilter}>
        <FontAwesomeIcon
          icon={faSliders}
          size="l"
          style={{ marginInlineEnd: ".5em" }}
        />
        <span>filter</span>
      </button>
      <Link className="btn" to={"/toy/edit"}>
        <FontAwesomeIcon
          icon={faPlus}
          size="l"
          style={{ marginInlineEnd: ".5em" }}
        />
        <span>Add Toy</span>
      </Link>
    </section>
  );
}

import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CartTableRow({ item, onRemoveItem }) {
  return (
    <tr className="cart-table-row">
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <button className="btn icon-btn" onClick={() => onRemoveItem(item._id)}>
          <FontAwesomeIcon icon={faMinus} />{" "}
        </button>
      </td>
    </tr>
  );
}

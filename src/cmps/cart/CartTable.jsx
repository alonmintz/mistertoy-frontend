import { CartTableRow } from "./CartTableRow";

export function CartTable({ items, onRemoveItem, sumTotal }) {
  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <CartTableRow item={item} onRemoveItem={onRemoveItem} />
        ))}
        <tr>
          <td>Total Price:</td>
          <td>{sumTotal}</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  );
}

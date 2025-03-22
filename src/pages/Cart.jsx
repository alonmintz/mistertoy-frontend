import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartActions } from "../store/actions/cart.actions";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { CartTable } from "../cmps/cart/CartTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export function Cart() {
  const items = useSelector((storeState) => storeState.cartModule.items);
  const [sumTotal, setSumTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSumTotal(calculateSumTotal());
  }, [items]);

  function calculateSumTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  function onRemoveItem(itemId) {
    cartActions.removeCartItem(itemId).then(showSuccessMsg);
  }

  function onBuyItems() {
    navigate("/");
    cartActions
      .setCartItems([])
      .then(() => showSuccessMsg("Cart Purchased Successfully"));
  }

  if (!items.length)
    return (
      <section className="cart">
        <section className="cart-container">
          <Link className="btn" to={`/toy`}>
            <FontAwesomeIcon icon={faArrowLeft} /> Go Back
          </Link>
          <h2>No items in your cart...</h2>
        </section>
      </section>
    );
  return (
    <section className="cart">
      <section className="cart-container">
        <h2>Your Shopping Cart:</h2>
        <CartTable
          items={items}
          onRemoveItem={onRemoveItem}
          sumTotal={sumTotal}
        />
        <div className="btn-group">
          <Link className="btn" to={`/toy`}>
            <FontAwesomeIcon icon={faArrowLeft} /> Go Back
          </Link>
          <button className="btn" onClick={onBuyItems}>
            Buy
          </button>
        </div>
      </section>
    </section>
  );
}

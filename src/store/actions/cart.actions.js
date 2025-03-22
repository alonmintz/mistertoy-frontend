import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_CART_ITEMS,
} from "../reducers/cart.reducer";
import { store } from "../store.js";

export const cartActions = { setCartItems, addCartItem, removeCartItem };

function setCartItems(items) {
  return new Promise((resolve) => {
    store.dispatch({ type: SET_CART_ITEMS, items });
    resolve("Cart Updated");
  });
}

function addCartItem(item) {
  return new Promise((resolve) => {
    store.dispatch({ type: ADD_CART_ITEM, item });
    resolve("Item added to cart");
  });
}

function removeCartItem(itemId) {
  return new Promise((resolve) => {
    store.dispatch({ type: REMOVE_CART_ITEM, itemId });
    resolve("Item removed from cart");
  });
}

export const SET_CART_ITEMS = "SET_CART_ITEMS";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

const initialState = {
  items: [],
};

export function cartReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        items: cmd.items,
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        items: [...state.items, cmd.item],
      };
    case REMOVE_CART_ITEM: {
      const indexToRemove = state.items.findIndex(
        (item) => item._id === cmd.itemId
      );
      if (indexToRemove !== -1) {
        return {
          ...state,
          items: [
            ...state.items.slice(0, indexToRemove),
            ...state.items.slice(indexToRemove + 1),
          ],
        };
      }
      return state;
    }

    default:
      return state;
  }
}

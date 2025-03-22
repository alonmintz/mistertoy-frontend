import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { toyReducer } from "./reducers/toy.reducer.js";
import { cartReducer } from "./reducers/cart.reducer.js";

const rootReducer = combineReducers({
  toyModule: toyReducer,
  cartModule: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// For Debug (easy access from console):
window.gStore = store;

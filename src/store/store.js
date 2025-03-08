import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { toyReducer } from "./reducers/toy.reducer.js";

const rootReducer = combineReducers({
  toyModule: toyReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore({
  reducer: rootReducer, // Correctly specify the reducer here
});
// export const store = configureStore(rootReducer, composeEnhancers());

// For Debug (easy access from console):
window.gStore = store;

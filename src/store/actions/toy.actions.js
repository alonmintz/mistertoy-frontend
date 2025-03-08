import { toyService } from "../../service/toy.service.js";
toyService;
import {
  SET_TOYS,
  REMOVE_TOY,
  ADD_TOY,
  UPDATE_TOY,
  UNDO_TOYS,
  SET_IS_LOADING,
} from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export const toyActions = {
  loadToys,
  saveToy,
  removeToy,
};

function loadToys() {
  const filterBy = store.getState().toyModule.filterBy;
  const sortBy = store.getState().toyModule.sortBy;
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  return toyService
    .query(filterBy, sortBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys });
    })
    .catch((err) => {
      console.log("toy action -> Cannot load toys", err);
      throw err;
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    });
}

function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY;
  return toyService
    .save(toy)
    .then((savedToy) => {
      store.dispatch({ type, toy: savedToy });
      return savedToy;
    })
    .catch((err) => {
      console.log("toy action -> Cannot save toy", err);
      throw err;
    });
}

function removeToy(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId });
  return toyService.remove(toyId).catch((err) => {
    store.dispatch({ type: UNDO_TOYS });
    console.log("toy action -> Cannot remove toy", err);
    throw err;
  });
}

import { useDispatch, useSelector } from "react-redux";
import { ToyFilter } from "../cmps/toy/ToyFilter";
import { ToyList } from "../cmps/toy/ToyList";
import { useEffect, useRef, useState } from "react";
import { toyActions } from "../store/actions/toy.actions";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { Outlet } from "react-router-dom";
import { SortBar } from "../cmps/toy/SortBar";
import { SET_FILTER_BY, SET_SORT_BY } from "../store/reducers/toy.reducer";
import { ConfirmAction } from "../cmps/general/ConfirnAction";
import { useSortFilterSearchParams } from "../hooks/useSortFilterSearchParams";

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy);
  const [showFilter, setShowFilter] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const removeIdRef = useRef();
  const dispatch = useDispatch();
  const setSortFilterSearchParams = useSortFilterSearchParams();

  useEffect(() => {
    toyActions
      .loadToys()
      .then(() => setSortFilterSearchParams(filterBy, sortBy))
      .catch((err) => {
        console.log(err);
        showErrorMsg("Error loading toys");
      });
  }, [filterBy, sortBy]);

  function toggleShowFilter() {
    setShowFilter((prev) => !prev);
  }

  function onSetSortBy(updatedSortBy) {
    dispatch({ type: SET_SORT_BY, sortBy: updatedSortBy });
  }

  function onSetFilterBy(updatedFilterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy: updatedFilterBy });
  }

  function onRemoveButtonClick(toyId) {
    removeIdRef.current = toyId;
    toggleIsConfirmOpen();
  }

  function onRemoveToy(toyId) {
    toyActions
      .removeToy(toyId)
      .then(toggleIsConfirmOpen)
      .then(() => {
        removeIdRef.current = null;
        showSuccessMsg("Toy Removed");
      })
      .catch((err) => {
        console.log({ err });
        showErrorMsg(`Error Removing Toy (id: ${toyId})`);
      });
  }

  function toggleIsConfirmOpen() {
    setIsConfirmOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <section className="toy-index">
      <SortBar
        sortBy={sortBy}
        onSetSortBy={onSetSortBy}
        onToggleFilter={toggleShowFilter}
      />
      {showFilter && (
        <ToyFilter
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
          onClose={toggleShowFilter}
        />
      )}
      <Outlet />
      <ToyList toys={toys} onRemoveToy={onRemoveButtonClick} />
      {isConfirmOpen && (
        <ConfirmAction
          action="remove"
          onConfirm={() => onRemoveToy(removeIdRef.current)}
          onCancel={toggleIsConfirmOpen}
        />
      )}
    </section>
  );
}

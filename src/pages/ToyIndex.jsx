import { useDispatch, useSelector } from "react-redux";
import { ToyFilter } from "../cmps/toy/ToyFilter";
import { ToyList } from "../cmps/toy/ToyList";
import { useEffect, useState } from "react";
import { toyActions } from "../store/actions/toy.actions";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { SortBar } from "../cmps/toy/SortBar";
import {
  SET_FILTER_BY,
  SET_SORT_AND_FILTER,
  SET_SORT_BY,
} from "../store/reducers/toy.reducer";
import { toyService } from "../service/toy.service";
import { ConfirmAction } from "../cmps/general/ConfirnAction";

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy);
  const [showFilter, setShowFilter] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toyToRemove, setToyToRemove] = useState(null);

  const dispatch = useDispatch();
  //TODO: implement searchParams. i'm stuck with it
  const [searchParams, setSearchParams] = useSearchParams();

  //   useEffect(() => {
  //     dispatch({
  //       type: SET_SORT_AND_FILTER,
  //       sortBy: toyService.getSortFromSearchParams(searchParams),
  //       filterBy: toyService.getFilterFromSearchParams(searchParams),
  //     });
  //   }, []);

  useEffect(() => {
    // setSearchParams({ ...filterBy, ...sortBy });

    toyActions.loadToys().catch((err) => {
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

  function onRemoveButtonClick(toy) {
    setToyToRemove(toy);
    toggleIsConfirmOpen();
  }

  function onRemoveToy(toy) {
    toyActions
      .removeToy(toy._id)
      .then(toggleIsConfirmOpen)
      .then(() => {
        setToyToRemove(null);
        showSuccessMsg("Toy Removed");
      })
      .catch((err) => {
        console.log({ err });
        showErrorMsg(`Error Removing Toy (id: ${toy._id})`);
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
          onConfirm={() => onRemoveToy(toyToRemove)}
          onCancel={toggleIsConfirmOpen}
        />
      )}
    </section>
  );
}

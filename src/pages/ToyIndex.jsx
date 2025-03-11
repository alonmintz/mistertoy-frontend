import { useDispatch, useSelector } from "react-redux";
import { ToyFilter } from "../cmps/toy/ToyFilter";
import { ToyList } from "../cmps/toy/ToyList";
import { useEffect, useState } from "react";
import { toyActions } from "../store/actions/toy.actions";
import { showErrorMsg } from "../service/event-bus.service";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { SortBar } from "../cmps/toy/SortBar";
import {
  SET_FILTER_BY,
  SET_SORT_AND_FILTER,
  SET_SORT_BY,
} from "../store/reducers/toy.reducer";
import { toyService } from "../service/toy.service";

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy);
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  //TODO: implement searchParams. i'm stuck with it
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // dispatch({
    //   type: SET_SORT_AND_FILTER,
    //   sortBy: toyService.getSortFromSearchParams(searchParams),
    //   filterBy: toyService.getFilterFromSearchParams(searchParams),
    // });
  }, []);

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

  return (
    <section className="toy-index content">
      <SortBar
        sortBy={sortBy}
        onSetSortBy={onSetSortBy}
        onToggleFilter={toggleShowFilter}
      />
      {showFilter && (
        <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      )}
      <Link className="btn" to={"/toy/edit"}>
        Add Toy
      </Link>
      <Outlet />
      <ToyList toys={toys} />
    </section>
  );
}

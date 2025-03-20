import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SET_SORT_AND_FILTER_BY } from "../store/reducers/toy.reducer";
import { toyService } from "../service/toy.service";
import { utilService } from "../service/util.service";

export function useSortFilterSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_SORT_AND_FILTER_BY,
      sortBy: toyService.getSortFromSearchParams(searchParams),
      filterBy: toyService.getFilterFromSearchParams(searchParams),
    });
  }, []);

  function setSortFilterSearchParams(filterBy, sortBy) {
    setSearchParams(utilService.getTruthyValues(filterBy, sortBy));
  }

  return setSortFilterSearchParams;
}

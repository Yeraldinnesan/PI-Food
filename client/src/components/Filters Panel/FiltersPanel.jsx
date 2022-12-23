import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { useState } from "react";
import "../Filters Panel/filterspanel.css";

import {
  getAllDiets,
  filterByDiet,
  setCurrentPage,
  filterCreated,
  sortAlphabetically,
  sortByHealthScore,
} from "../../redux/actions/index";

import Filters from "./Filters/Filters";
import Sorters from "./Sorters/Sorters";

const FiltersBar = (props) => {
  const allDiets = useSelector((state) => state.diets);

  //------------------->  LOCAL STATES <------------------
  // const [alphOrder, setAlphOrder] = useState("");
  //   const [scoreOrder, setScoreOrder] = useState("");
  //--------------------------------------------------------
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
  }, []);

  //----------------------> FILTER HANDLERS <---------------
  const dietFilterHandler = (e) => {
    dispatch(filterByDiet(e.target.value));
    dispatch(setCurrentPage(1)); // if standing on another page thats not 1 directs you to page 1 when filtering
    // setAlphOrder("");
    //     setScoreOrder("");
  };

  const createdFilterHandler = (e) => {
    dispatch(filterCreated(e.target.value));
    dispatch(setCurrentPage(1));
    // setAlphOrder("");
    // setScoreOrder("");
  };

  //--------------------------> SORT HANDLERS <-----------------

  const alphSorterHandler = (e) => {
    e.preventDefault();
    dispatch(sortAlphabetically(e.target.value));
    dispatch(setCurrentPage(1));
    // setAlphOrder(`Ordered ${e.target.value}`);
  };

  const scoreSorterHandler = (e) => {
    e.preventDefault();
    dispatch(sortByHealthScore(e.target.value));
    dispatch(setCurrentPage(1));
    // setScoreOrder(`Ordered${e.target.value}`);
  };
  //-----------------------------------------------------------------
  return (
    <div>
      {/* SORTERS */}
      <div className="sort-group">
        <p className="label">Sort</p>
        <Sorters
          alphSorterHandler={alphSorterHandler}
          scoreSorterHandler={scoreSorterHandler}
        />
      </div>
      {/* FILTERS */}
      <div>
        <p className="label">Filter</p>
        <Filters
          allDiets={allDiets}
          dietFilterHandler={dietFilterHandler}
          createdFilterHandler={createdFilterHandler}
        />
      </div>
    </div>
  );
};

export default FiltersBar;

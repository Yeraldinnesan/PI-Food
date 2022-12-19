import React from "react";
import { useDispatch } from "react-redux";
import { sortAlphabetically, setCurrentPage } from "../../../redux/actions";
import { useState } from "react";

const AtoZ = (props) => {
  const [order, setOrder] = useState("");

  const dispatch = useDispatch();

  // const currPage = useSelector((state) => state.currentPage);

  const alphSorterHandler = (e) => {
    e.preventDefault();
    dispatch(sortAlphabetically(e.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${e.target.value}`);
  };

  /* always a value - allows us to create conditionals */
  return (
    <div>
      <label>
        Sort by Alphabetical order:
        <select onChange={(e) => alphSorterHandler(e)}>
          <option value="a-z">a - z</option>
          <option value="z-a">z - a</option>
        </select>
      </label>
    </div>
  );
};

export default AtoZ;

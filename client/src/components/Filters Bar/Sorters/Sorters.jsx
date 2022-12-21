import React from "react";

const Sorters = (props) => {
  //const dispatch = useDispatch();

  // const currPage = useSelector((state) => state.currentPage);

  /* always a value - allows us to create conditionals */
  return (
    <div>
      <label>
        Sort by Alphabetical order:
        <select onChange={(e) => props.alphSorterHandler(e)}>
          <option value="a-z">a - z</option>
          <option value="z-a">z - a</option>
        </select>
      </label>
      <label>
        Sort by Health Score:
        <select onChange={(e) => props.scoreSorterHandler(e)}>
          <option value="min-max">min - max</option>
          <option value="max-min">max - min</option>
        </select>
      </label>
    </div>
  );
};

export default Sorters;

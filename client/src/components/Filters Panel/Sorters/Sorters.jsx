import React from "react";
import "../Sorters/sorters.css";

const Sorters = (props) => {
  //const dispatch = useDispatch();

  // const currPage = useSelector((state) => state.currentPage);

  /* always a value - allows us to create conditionals */
  return (
    <div className="sorters-wrap">
      {/* <div className="alph"> */}
      <p>Alphabetically 📘</p>
      <label>
        <select onChange={(e) => props.alphSorterHandler(e)}>
          <option selected disabled>
            --
          </option>
          <option value="a-z">a - z</option>
          <option value="z-a">z - a</option>
        </select>
      </label>
      {/* </div> */}
      {/* <div className="score-range"> */}
      <label>
        <p>Health Score 🫀</p>
        <select onChange={(e) => props.scoreSorterHandler(e)}>
          <option selected disabled>
            --
          </option>
          <option value="min-max">min - max</option>
          <option value="max-min">max - min</option>
        </select>
      </label>
      {/* </div> */}
    </div>
  );
};

export default Sorters;

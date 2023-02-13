import React from "react";
import "../Sorters/sorters.css";

const Sorters = (props) => {
  //const dispatch = useDispatch();

  // const currPage = useSelector((state) => state.currentPage);

  /* always a value - allows us to create conditionals */
  return (
    <div className="sorters-wrap">
      {/* <div className="alph"> */}
      <p>A - Z 📘</p>
      <label>
        <span className="custom-dropdown big">
          <select
            defaultValue="--"
            onChange={(e) => props.alphSorterHandler(e)}
          >
            <option value="--">--</option>
            <option value="a-z">a - z</option>
            <option value="z-a">z - a</option>
          </select>
        </span>
      </label>
      <label>
        <p>Health Score 🫀</p>
        <span className="custom-dropdown big">
          <select
            defaultValue="--"
            onChange={(e) => props.scoreSorterHandler(e)}
          >
            <option value="--">--</option>
            <option value="min-max">min - max</option>
            <option value="max-min">max - min</option>
          </select>
        </span>
      </label>
      {/* </div> */}
    </div>
  );
};

export default Sorters;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllDiets,
  filterByDiet,
  setCurrentPage,
} from "../../../redux/actions/index";

const DietTypes = (props) => {
  const allDiets = useSelector((state) => state.diets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
  }, []);

  const dietFilterHandler = (e) => {
    dispatch(filterByDiet(e.target.value));
    dispatch(setCurrentPage(1)); // if standing on another page thats not 1 directs you to page 1 when filtering
  };

  return (
    <div>
      <label>
        Filter by Diet:
        <select onChange={(e) => dietFilterHandler(e)}>
          <option value="all">all</option>
          {allDiets?.map((el) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DietTypes;

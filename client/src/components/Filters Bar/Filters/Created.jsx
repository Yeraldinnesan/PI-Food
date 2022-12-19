import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated, setCurrentPage } from "../../../redux/actions";
const Created = () => {
  const dispatch = useDispatch();

  const createdFilterHandler = (e) => {
    dispatch(filterCreated(e.target.value));
    dispatch(setCurrentPage(1));
  };
  return (
    <div className="created">
      <label>
        Filter by created:
        <select onChange={(e) => createdFilterHandler(e)}>
          <option>--</option>
          <option value="api">Recipe Book</option>
          <option value="database">Created</option>
        </select>
      </label>
    </div>
  );
};

export default Created;

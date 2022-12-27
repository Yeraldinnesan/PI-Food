import React from "react";
import "../Filters/filters.css";

const Filters = (props) => {
  return (
    <div className="filters-wrap">
      <label className="label">
        <p>Diets</p>
        <select defaultValue="--" onChange={(e) => props.dietFilterHandler(e)}>
          <option value="--">--</option>
          {props.allDiets?.map((el) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </select>
      </label>
      <label className="label">
        By created:
        <select onChange={(e) => props.createdFilterHandler(e)}>
          <option value="api">Recipe Book</option>
          <option value="database">Created</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;

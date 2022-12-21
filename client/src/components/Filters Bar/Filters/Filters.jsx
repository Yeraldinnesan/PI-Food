import React from "react";

const Filters = (props) => {
  return (
    <div>
      <label>
        Filter by Diet:
        <select onChange={(e) => props.dietFilterHandler(e)}>
          <option value="all">all</option>
          {props.allDiets?.map((el) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </select>
      </label>
      <label>
        Filter by created:
        <select onChange={(e) => props.createdFilterHandler(e)}>
          <option value="api">Recipe Book</option>
          <option value="database">Created</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;

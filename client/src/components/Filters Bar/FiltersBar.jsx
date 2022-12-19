import React from "react";
// import { useState, useEffect } from "react";

import Created from "./Filters/Created";
import DietTypes from "./Filters/DietType";
import AtoZ from "./Sorters/AtoZ";
import HealthScore from "./Sorters/HealthScore";

const FiltersBar = (props) => {
  // const dispatch = useDispatch();

  return (
    <div>
      <AtoZ />
      <HealthScore />
      <DietTypes />
      <Created />
    </div>
  );
};

export default FiltersBar;

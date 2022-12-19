import React from "react";

const HealthScore = () => {
  return (
    <div>
      <label>
        Sort by HealthScore:
        <select>
          <option value="up">Highest</option>
          <option value="down">Lowest</option>
        </select>
      </label>
    </div>
  );
};

export default HealthScore;

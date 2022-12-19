import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landingpage-bg">
      <h1>Welcome to FoodTastic</h1>
      <Link to="/home">
        <button>Check it Out</button>
      </Link>
    </div>
  );
}

export default Landing;

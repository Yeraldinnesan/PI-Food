import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

function Landing() {
  return (
    <div className="landingpage-bg">
      <h1 className="landing-title">
        100 <br />
        Easy and
        <br /> Healthy <br /> Recipes
      </h1>
      <Link to="/home">
        <div className="button-container">
          <button className="custom-btn">Dive In</button>
        </div>
      </Link>
    </div>
  );
}

export default Landing;

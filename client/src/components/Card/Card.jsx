import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "../Card/card.css";

const Card = (props) => {
  return (
    <div className="card-wrap">
      <div key={props.id}></div>
      <img src={props.image} alt={props.name} />
      <header>
        <h3>{props.name}</h3>
      </header>
      <footer>
        <span>
          <h2>🫀 {props.healthScore}</h2>
        </span>
        <span>
          {props.diets?.map((el) => (
            <p>👉 {el}</p>
          ))}
        </span>
      </footer>
    </div>
  );
};

export default Card;

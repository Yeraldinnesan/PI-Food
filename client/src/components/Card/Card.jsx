import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <img src={props.image} alt={props.name} />
      <h1>{props.healthScore}</h1>
      <h4>Diets:</h4>
      <ul>
        {props.diets?.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;

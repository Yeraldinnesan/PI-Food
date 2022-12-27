import React from "react";
import Card from "./Card";

const Cards = (props) => {
  return (
    <div>
      <div className="cardlist-section">
        {props.currentRecipes?.map((el) => {
          return (
            <Card
              key={el.id}
              id={el.id}
              name={el.name}
              diets={el.diets}
              image={el.image}
              healthScore={el.healthScore}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;

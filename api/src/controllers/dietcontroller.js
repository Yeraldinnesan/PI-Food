const { DietType } = require("../db");

const dietsToDb = async () => {
  const diets = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
    "dairy free",
  ];
  // Iterate each element of the array and checks
  //in the database if the name (where: name of element) does not exists, creates it
  diets.forEach((el) => {
    DietType.findOrCreate({
      where: {
        name: el,
      },
    });
  });
  return DietType.findAll();
};

module.exports = { dietsToDb };

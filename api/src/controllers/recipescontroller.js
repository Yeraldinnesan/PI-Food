// const Recipe = require("../models/Recipe");
const { allSearches } = require("./functionscontroller");
const { DietType, Recipe } = require("../db");

// ----------------> Filter recipes by their name
// Brings all recipes related with the keyword entered

const filterByName = async (name) => {
  try {
    if (name) {
      const searchAll = await allSearches();
      const filteredRecipes = await searchAll.filter(
        (ele) => ele.name.toLowerCase().includes(name.toLowerCase()) === true
      );
      if (filteredRecipes.length) return filteredRecipes;
      else {
        throw `No recipe found by ${name}! Try again!`;
      }
    } else {
      const allRecipes = allSearches();
      return allRecipes;
    }
  } catch (err) {
    return err;
  }
};

// ----------------> Filter recipes by their id
// Brings a specific recipe that belongs to the id entered

const filterById = async (id) => {
  try {
    const searchAll = await allSearches();
    const foundRecipe = await searchAll.find(
      (el) => parseInt(el.id) === parseInt(id)
    );
    if (foundRecipe) return foundRecipe;
    else throw `No recipes found with the id ${id}! Try again!`;
  } catch (err) {
    return err;
  }
};

// -----------------> Post Controller

const postRecipe = async (newRecipe) => {
  try {
    const { name, cookingTime, summary, healthScore, steps, image, diets } =
      newRecipe;
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
      image,
      cookingTime,
    };

    const allDiets = await DietType.findAll({
      where: {
        name: diets,
      },
    });
    const createRecipe = await Recipe.create(recipe);
    // createRecipe.addDiet(allDiets);
    return Recipe.findAll();
  } catch (error) {
    console.log(error);
  }
};

//-----------------------------------------------

// const postRecipe = async (newRecipe) => {
//   const { name, summary, steps, healthScore, diets } = newRecipe;
//   try {
//     if (!name || !summary || !healthScore) throw "Mandatory field missing";
//     const createdRecipe = await Recipe.create({ ...newRecipe });
//     return "Recipe successfully created";
//   } catch (err) {
//     return err;
//   }
// };

// const filterByName = async (req, res) => {
//   try {
//     const { name } = req.query;
//     if (name) {
//       const allRecipes = await allSearches();
//       const filteredRecipes = await allRecipes.filter(
//         (el) => el.name.toLowerCase().includes(name.toLowerCase()) === true
//       );
//     }
//     filteredRecipes.length
//       ? res.status(200).json(filteredRecipes)
//       : res.status(200).json(allRecipes);
//----------------------------------------
// name
//   ? res.status(200).json(filteredRecipes)
//   : res.status(200).json(allRecipes);
// if (!filteredRecipes.length) throw "No recipes found";
//     throw "No recipes found";
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

module.exports = { filterByName, filterById, postRecipe };

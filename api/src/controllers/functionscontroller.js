const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, DietType } = require("../db.js");

// -----------------> Fetch all the info from the API <-----------------

const apiSearch = async () => {
  try {
    // const response = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    // );

    const response = await axios.get(
      "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    );
    const apiRecipes = await response.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        cookingTime: recipe.readyInMinutes,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diet?.map((el) => el),
        steps: recipe.analyzedInstructions,
      };
    });
    return apiRecipes;
  } catch (err) {
    console.log("apiSearch function error", err);
  }
};

// ----------------->  Fetch info from the DataBase  <-------------------

const dbSearch = async () => {
  try {
    const dbRecipes = await Recipe.findAll({
      include: {
        model: DietType,
        attributes: ["name"],
        //if any of the attributes is in the realations
        //
        through: {
          attributes: [],
        },
      },
    });
    let dbRecipe = await dbRecipes?.map((el) => {
      return {
        id: el.id,
        name: el.name,
        cookingTime: el.cookingTime,
        image: el.image,
        summary: el.summary,
        healthScore: el.healthScore,
        diets: el.diet?.map((e) => e),
        steps: el.steps,
      };
    });
    return dbRecipe;
  } catch (err) {
    console.log("Error in dbSearch function", err);
  }
};

// -----------------> Merge both fetches of info <--------------------

const allSearches = async () => {
  try {
    const apiResponse = await apiSearch();
    const dbResponse = await dbSearch();
    //Concatenate both responses to have a unified one and use it from now on
    const allResponses = await apiResponse.concat(dbResponse);
    return allResponses;
  } catch (err) {
    return err;
  }
};

module.exports = { apiSearch, dbSearch, allSearches };

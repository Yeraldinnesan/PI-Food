const { Router } = require("express");
const {
  filterByName,
  filterById,
  postRecipe,
} = require("../controllers/recipescontroller");

const recipesRouter = Router();

// -----------------> GET by name and all recipes Routes unified

recipesRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const filteredRecipes = await filterByName(name);
      res.status(200).json(filteredRecipes);
    } else {
      const allRecipes = await filterByName();
      res.status(200).json(allRecipes);
    }
  } catch (err) {
    res.status(400).json(send(err));
  }
});

// -----------------> POST recipe Route

recipesRouter.post("/", async (req, res) => {
  try {
    const toPostRecipe = req.body;
    if (!toPostRecipe) res.status(404).send("Mandatory fields missing");
    const newRecipe = await postRecipe(toPostRecipe);
    // created succesfully
    res.status(201).send(newRecipe);
  } catch (error) {
    // not founds
    res.status(404).send(error);
  }
});

// -----------------> GET by id Route

recipesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundRecipe = await filterById(id);
    res.status(200).json(foundRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = { recipesRouter };

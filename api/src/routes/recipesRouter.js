const { Router } = require("express");
const { Diet, Recipe } = require("../db");
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

//-----------------------

/// DELETE que acepta un parámetro de ruta "id" y elimina una receta específica de la base de datos por su ID.
recipesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send("Delete Succesfull");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

///////////////////////////////////////

recipesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, summary, steps, healthScore, diets, image } = req.body;
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    await Recipe.update(
      {
        name: name,
        summary: summary,
        image: image,
        steps: steps,
        healthScore: healthScore,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (diets.length) {
      await recipe.setDiets([]);
      diets.forEach(async (e) => {
        const diet = await Diet.findOne({
          where: {
            name: e,
          },
        });
        if (diet) {
          await recipe.addDiet(diet);
        }
      });
    }

    // Obtener la instancia actualizada de la receta
    const updatedRecipe = await Recipe.findByPk(id, {
      include: [{ model: Diet }],
    });
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
module.exports = { recipesRouter };

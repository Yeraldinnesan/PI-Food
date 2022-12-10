const { Router } = require("express");
const { dietsToDb } = require("../controllers/dietcontroller");

const dietsRouter = Router();

dietsRouter.get("/", async (req, res) => {
  try {
    const foundDiets = await dietsToDb();
    res.status(200).json(foundDiets);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = { dietsRouter };

const express = require('express');
const { getAllRecipes, createRecipe, getRecipeDetails, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.route("/recipe/new").post(createRecipe);
router.route("/recipes").get(getAllRecipes);
router.route("/recipe/:id").get(getRecipeDetails).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
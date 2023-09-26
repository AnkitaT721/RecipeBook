const express = require('express');
const { getAllRecipes, createRecipe, getRecipeDetails, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route("/recipe/new").post(isAuthenticatedUser, createRecipe);
router.route("/recipes").get(isAuthenticatedUser, getAllRecipes);
router.route("/recipe/:id").get(getRecipeDetails).put(isAuthenticatedUser, updateRecipe).delete(isAuthenticatedUser, deleteRecipe);

module.exports = router;
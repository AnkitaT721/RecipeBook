const express = require("express");
const {
  getAllRecipes,
  createRecipe,
  getRecipeDetails,
  updateRecipe,
  deleteRecipe,
  addComment,
  addLike,
  unLike,
  getComments,
  getMyRecipes,
  getUserRecipes,
} = require("../controllers/recipeController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/recipe/new").post(isAuthenticatedUser, createRecipe);
router.route("/recipes").get(getAllRecipes);
router
  .route("/recipe/:id")
  .get(getRecipeDetails)
  .put(isAuthenticatedUser, updateRecipe)
  .delete(isAuthenticatedUser, deleteRecipe);

router.route("/comment").put(isAuthenticatedUser, addComment);
router.route("/like").put(isAuthenticatedUser, addLike);
router.route("/unlike").put(isAuthenticatedUser, unLike);

router.route("/comments").get(getComments);
router.route("/myposts").get(isAuthenticatedUser, getMyRecipes);
router.route("/userrecipes/:id").get(getUserRecipes);

module.exports = router;

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
} = require("../controllers/recipeController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { newPost, myPosts } = require("../controllers/postController");

const router = express.Router();

router.route("/recipe/new").post(isAuthenticatedUser, createRecipe);
router.route("/recipes").get(isAuthenticatedUser, getAllRecipes);
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

module.exports = router;

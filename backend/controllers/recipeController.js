const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Recipe = require("../models/recipeModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

//create/upload recipe
exports.createRecipe = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    recipe,
  });
});

//Get all recipes
exports.getAllRecipes = catchAsyncErrors(async (req, res) => {
  const postsPerPage = 2;

  const apiFeatures = new ApiFeatures(Recipe.find(), req.query)
    .search()
    .filter()
    .pagination(postsPerPage);
  const recipes = await apiFeatures.query;

  // recipes = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    recipes,
  });
});

//Get detailed recipe
exports.getRecipeDetails = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(new ErrorHandler("Recipe not found", 404));
  }

  res.status(200).json({
    success: true,
    recipe,
  });
});

//update recipe
exports.updateRecipe = catchAsyncErrors(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(new ErrorHandler("Recipe not found", 404));
  }

  recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    recipe,
  });
});

//Delete recipe
exports.deleteRecipe = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(new ErrorHandler("Recipe not found", 404));
  }

  await recipe.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

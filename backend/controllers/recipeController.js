const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Recipe = require("../models/recipeModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

//create/upload recipe
exports.createRecipe = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    recipe,
  });
});

//Get all recipes
exports.getAllRecipes = catchAsyncErrors(async (req, res) => {
  const postsPerPage = 10;

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

//add like
exports.addLike = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.body.recipeId);

  const like = {
    user: req.user._id,
    name: req.user.name,
  };

  recipe.likes.push(like);
  recipe.likeCount = recipe.likes.length;

  await recipe.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//unlike
exports.unLike = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.body.recipeId);

  const like = {
    user: req.user._id,
    name: req.user.name,
  };

  recipe.likes.pull(like);
  recipe.likeCount = recipe.likes.length - 1;

  await recipe.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//add comment
exports.addComment = catchAsyncErrors(async (req, res, next) => {
  const { message, recipeId } = req.body;

  const comment = {
    user: req.user._id,
    name: req.user.name,
    message,
  };

  const recipe = await Recipe.findById(recipeId);

  recipe.comments.push(comment);
  recipe.numOfComments = recipe.comments.length;

  await recipe.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get comments and likes
exports.getComments = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.query.recipeId);

  if (!recipe) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    comments: recipe.comments,
    likedBy: recipe.likes[0].name,
    likeCount: recipe.likes.length,
  });
});


//get my posts
exports.getMyRecipes = catchAsyncErrors(async (req, res, next) => {
  const uId = req.user._id;

  // Use Mongoose to find recipes that belong to the specified user
  const myRecipes = await Recipe.find({ user: uId });

  if (!myRecipes) {
    return next(new ErrorHandler("Recipes not found for the specified user", 404));
  }

  res.status(200).json({
    success: true,
    myRecipes,
  });
});

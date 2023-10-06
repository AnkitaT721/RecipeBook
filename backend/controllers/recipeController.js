const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Recipe = require("../models/recipeModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create/upload recipe
exports.createRecipe = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "Recipe Images -- Recipe Diary",
    width: 150,
    crop: "scale",
  });

  const {
    title,
    ingredients,
    category,
    type,
    serves,
    process,
  } = req.body;

  const recipe = await Recipe.create({
    title,
    ingredients,
    category,
    type,
    serves,
    process,
    user: req.user._id,
    userName: req.user.name,
    userBio: req.user.bio,
    userImg: req.user.profilePic.url,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    recipe,
  });
});

//Get all recipes
exports.getAllRecipes = catchAsyncErrors(async (req, res) => {
  const postsPerPage = 6;
  const recipeCount = await Recipe.countDocuments();

  const apiFeatures = new ApiFeatures(Recipe.find(), req.query)
    .search()
    .filter()
    .pagination(postsPerPage);
  let recipes = await apiFeatures.query;

  let filteredCount = recipes.length;

  // apiFeatures.pagination(postsPerPage);

  // recipes = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    recipes,
    filteredCount,
    postsPerPage,
    recipeCount
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
    return next(
      new ErrorHandler("Recipes not found for the specified user", 404)
    );
  }

  res.status(200).json({
    success: true,
    myRecipes,
  });
});

//get user posts
exports.getUserRecipes = catchAsyncErrors(async (req, res, next) => {
  const uId = req.params.id;

  // Use Mongoose to find recipes that belong to the specified user
  const userRecipes = await Recipe.find({ user: uId });

  if (!userRecipes) {
    return next(
      new ErrorHandler("Recipes not found for the specified user", 404)
    );
  }

  res.status(200).json({
    success: true,
    userRecipes,
  });
});


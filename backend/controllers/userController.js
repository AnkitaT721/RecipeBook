const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Recipe = require("../models/recipeModel");

//register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic, {
    folder: "profilePic--RecipeDiary",
    width: 150,
    crop: "scale",
  });
  const { name, email, password, bio } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    bio,
    profilePic: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if both email and password are given
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("recipeToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully",
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //getting Reset Password token
  const resetToken = user.getResetPassToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is : \n\n${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        404
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user details
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const newDetails = {
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
  };

  if (req.body.profilePic !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.profilePic.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic, {
      folder: "profilePic--RecipeDiary",
      width: 150,
      crop: "scale",
    });

    newDetails.profilePic = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});





//save recipes
exports.saveRecipes = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  const user = await User.findById(req.user.id);

  user.recipes.push({
    recipe: recipe._id,
    recipeName: recipe.title,
    recipeImg: recipe.image.url,
    recipeCate: recipe.category,
    recipeType: recipe.type,
    recipeServe: recipe.serves
  });

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
})

//Delete saved recipe
exports.unSave = catchAsyncErrors(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  const user = await User.findById(req.user.id);

  user.recipes.pull({
    recipe: recipe._id,
    recipeName: recipe.title,
    recipeImg: recipe.image.url,
    recipeCate: recipe.category,
    recipeType: recipe.type,
    recipeServe: recipe.serves
  });

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


//get saved recipes
exports.getSavedRecipes = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findById(req.user.id);

  if(!user) {
    return next(new ErrorHandler("No User Found", 404));
  }

  const savedRecipes = user.recipes

  res.status(200).json({
    success: true,
    savedRecipes
  });
})

//get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

//register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    profilePic: {
      public_id: "sample id",
      url: "profilePic url",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});

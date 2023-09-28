const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Post = require("../models/postModel")
const ErrorHandler = require("../utils/errorHandler");

exports.newPost = catchAsyncErrors(async(req, res, next) => {
    const post = await Post.create({
        user: req.user.userId,
        recipe: req.body.recipeId
    })
    
    res.status(200).json({
        success: true
    })
});

exports.myPosts = catchAsyncErrors(async(req, res, next) => {
    const posts = await Post.findById(req.params.id);

    if(!posts) {
        return next(new ErrorHandler("No posts found", 404));
    }

    res.status(200).json({
        success: true,
        posts
    })
});

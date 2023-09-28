const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  posts: [
    {
      recipe: {
        type: mongoose.Schema.ObjectId,
        ref: "Recipe",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);

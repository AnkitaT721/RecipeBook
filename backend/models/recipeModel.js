const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    trim: true,
  },

  ingredients: {
    type: String,
    required: [true, "Please enter a title"],
  },

  category: {
    type: String,
    required: [true, "Please select a category"],
  },

  type: {
    type: String,
    required: [true, "Please select a type"],
  },

  serves: {
    type: Number,
    required: true,
    default: 4,
  },

  process: {
    type: String,
    required: [true, "Please enter the process"],
  },

  // image: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },

  likeCount: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      // user: {
      //   type: mongoose.Schema.ObjectId,
      //   required: true
      // },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  numOfComments: {
    type: Number,
    default: 0,
  },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);

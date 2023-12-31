const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserDetails,
  saveRecipes,
  getSavedRecipes,
  unSave,
  getAllUsers,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/mydetails").get(isAuthenticatedUser, getUserDetails);
router.route("/mydetails/update").put(isAuthenticatedUser, updateUserDetails);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/save/:id").put(isAuthenticatedUser, saveRecipes);
router.route("/getsaved").get(isAuthenticatedUser, getSavedRecipes);
router.route("/deletesaved/:id").put(isAuthenticatedUser, unSave);
router.route("/allusers").get(getAllUsers);

module.exports = router;

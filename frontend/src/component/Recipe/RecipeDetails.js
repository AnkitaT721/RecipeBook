import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./RecipeDetails.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import {
  addComment,
  clearErrors,
  getRecipeDetails,
} from "../../actions/recipeAction";
import { ADD_COMMENT_RESET } from "../../constants/recipeConstants";
import { saveRecipes } from "../../actions/userAction";
import { SAVE_RESET } from "../../constants/userConstants";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { recipe, loading, error } = useSelector(
    (state) => state.recipeDetails
  );

  const { success, error: commentError } = useSelector(
    (state) => state.addComment
  );

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { success: saveSuccess, isSaved } = useSelector(
    (state) => state.saveRecipes
  );

  const { error: saveError } = useSelector((state) => state.saveRecipes);

  const [message, setMessage] = useState("");

  const addCommentHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("message", message);
    myForm.set("recipeId", id);

    dispatch(addComment(myForm));
  };

  const saveRecipeHandler = () => {
    if (!isAuthenticated) {
      toast.error(saveError);
      dispatch(clearErrors());
    } else if (user && user.recipes.some((el) => el.recipe === recipe._id)) {
      toast.error("Already Saved");
    } else {
      dispatch(saveRecipes(id));
      toast.success("Recipe Saved");
    }
  };

  const alreadySaved = () => {
    toast.error("Already Saved");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (commentError) {
      toast.error(commentError);
      dispatch(clearErrors());
    }

    // if (saveError) {
    //   toast.error(saveError);
    //   dispatch(clearErrors());
    // }

    if (success) {
      toast.success("Comment added successfully");
      setMessage("");

      dispatch({ type: ADD_COMMENT_RESET });
    }

    dispatch(getRecipeDetails(id));

    dispatch({ type: SAVE_RESET });

    window.scrollTo(0, 0);
  }, [dispatch, id, error, success, commentError, saveSuccess]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData heading={`Recipe Diary--${recipe.title}`} />
          <div className="recipeDetails">
            <div>
              <h1>Detailed Recipe</h1>
              <img src={recipe.image && recipe.image.url} alt="recipeimage" />
            </div>

            <div className="recipe-like-comment">
              <div className="like-comment-1">
                <a href="#container">
                  <div className="comment">
                    <MdOutlineInsertComment /> {recipe.numOfComments}
                  </div>
                </a>
                <div className={"saved"}>
                  {isSaved ? (
                    <FaBookmark onClick={alreadySaved} />
                  ) : (
                    <FaRegBookmark onClick={saveRecipeHandler} />
                  )}
                </div>
              </div>

              <div className="add-comment">
                <form className="comment-form">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button onClick={addCommentHandler}>Add</button>
                </form>
              </div>

              <div className="details-1">
                <div>
                  <h2>{recipe.title}</h2>
                  <p className={recipe.type === "veg" ? "green" : "red"}>
                    {recipe.type}
                  </p>
                </div>

                <h3>Ingredients:</h3>
                <span>{recipe.ingredients}</span>
              </div>

              <div className="details-2">
                <p>
                  <span>Cuisine:</span> {recipe.category}
                </p>
                <p>
                  <span>Serves:</span> {recipe.serves}
                </p>
              </div>

              <div className="details-3">
                <h3>Cooking Process:</h3>
                <p style={{ whiteSpace: "pre-line" }}>{recipe.process}</p>
              </div>
              <div className="details-4">
              <Link className="user-name" to={`/profile/${recipe.user}`}>
                Created by {recipe.userName}
              </Link>
              <p className="createdAt">{String(recipe.createdAt).substring(0, 10)}</p>
              </div>
            </div>
          </div>

          <div className="comments-section" id="container">
            <h3>Comments</h3>

            {recipe.comments && recipe.comments[0] ? (
              <div className="comments-stack">
                {recipe.comments &&
                  recipe.comments.map((comment) => (
                    <ul>
                      <li>
                        <p>{comment.name}</p>
                        {comment.message}
                      </li>
                    </ul>
                  ))}
              </div>
            ) : (
              <p>No Comments Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default RecipeDetails;

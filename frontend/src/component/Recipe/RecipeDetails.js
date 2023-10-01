import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./RecipeDetails.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { clearErrors, getRecipeDetails } from "../../actions/recipeAction";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { recipe, loading, error } = useSelector(
    (state) => state.recipeDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRecipeDetails(id));

    window.scrollTo(0, 0);
  }, [dispatch, id, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData heading={`Recipe Diary--${recipe.title}`} />
          <div className="recipeDetails">
            <div>
              <img src={recipe.image && recipe.image.url} alt="recipeimage" />
            </div>

            <div className="recipe-like-comment">
              <div className="like-comment-1">
                <div className="like">
                  <AiOutlineHeart /> {recipe.likeCount}
                </div>
                <a href="#container">
                <div className="comment">
                  <MdOutlineInsertComment /> {recipe.numOfComments}
                </div>
                </a>
                <div className="saved">
                  <FaRegBookmark />
                </div>
              </div>

              <div className="add-comment">
                <form className="comment-form">
                  <input type="text" placeholder="Add a comment" />
                  <button>Add</button>
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
                <p>{recipe.process}</p>
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
                      <li><p>{comment.name}</p>{comment.message}</li>
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

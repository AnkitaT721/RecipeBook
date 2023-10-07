import React from "react";
import { Link, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { unsaveRecipes } from "../../actions/userAction";
import { toast } from "react-toastify";

const SavedRecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  id = recipe.recipe;

  return (
    <>
      <div className="mainProfileRecipe">
        <div className="profileRecipeCard">
          <img src={recipe.recipeImg} alt="recipeimg" />
          <div className="recipeinfo">
            <div>
              <Link className="recipeTitle" to={`/recipe/${recipe.recipe}`}>
                {recipe.recipeName}
              </Link>
              <div className="info">
                <p className="type">{recipe.recipeType}</p>
                <p>
                  <span>Cuisine: </span>
                  {recipe.recipeCate}
                </p>
                <p>
                  <span>Serves: </span> {recipe.recipeServe}
                </p>
              </div>
            </div>
          </div>
          <RxCross2
            id="remove-save"
            onClick={() => {
              dispatch(unsaveRecipes(id));
              // document.location.reload();
              toast.success("Removed from saved!!");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SavedRecipeCard;

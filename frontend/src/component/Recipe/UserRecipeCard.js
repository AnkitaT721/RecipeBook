import React from "react";
import { Link } from "react-router-dom";

const UserRecipeCard = ({ recipe }) => {
  return (
    <>
      <div className="userResMain">
      </div>
        <div className="createRecipeContainer">
          <div className="profileRecipeCard">
            <img src={recipe.image.url} alt="recipeimg" />
            <div className="recipeinfo">
              <div>
                <Link className="recipeTitle" to={`/recipe/${recipe._id}`}>
                  {recipe.title}
                </Link>
                <div className="info">
                  <p className="type">{recipe.type}</p>
                  <p>
                    <span>Cuisine: </span>
                    {recipe.category}
                  </p>
                  <p>
                    <span>Serves: </span> {recipe.serves}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default UserRecipeCard;

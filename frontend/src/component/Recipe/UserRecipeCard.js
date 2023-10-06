import React from "react";
import { Link } from "react-router-dom";

const UserRecipeCard = ({ recipe }) => {
  return (
    <>
      <div className="userResMain">
        <div className="userDetailsMain">
          <img src={recipe.userImg} alt="user profile pic" />
          <h4>
            User Name: <span>{recipe.userName}</span>
          </h4>
          <h4>
            Bio: <span>{recipe.userBio}</span>
          </h4>
        </div>
      </div>
        <div className="createRecipeContainer">
          <h2 className="createHeading">
            {`${recipe.userName}'s`} <span>Recipes</span>
          </h2>
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

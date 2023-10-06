import React from "react";
import { Link } from "react-router-dom"; 
import { BiCommentDetail } from "react-icons/bi";

const Recipe = ({ recipe }) => {
  return (
    <Link className="recipeCard" to={`/recipe/${recipe._id}`}>
      <img src={recipe.image.url} alt="recipeimg" />
      <div className="title-div">
      <p className="title">{recipe.title}</p>
      <p className="type">{recipe.type}</p>
      </div>
      
      <div className="recipe-category">
        <p><span>Cuisine: </span>{recipe.category}</p>
        <p><span>Serves: </span> {recipe.serves}</p>
      </div>
      <div className="like-comment">
        <p>
          <BiCommentDetail />
          <span>{recipe.numOfComments}</span>
        </p>
      </div>
    </Link>
  );
};

export default Recipe;

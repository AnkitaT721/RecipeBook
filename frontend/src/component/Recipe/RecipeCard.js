import React from 'react';
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";

const RecipeCard = ({ recipe }) => {
  return (
    <>
    <div className="main-recipecard">
      <Link className="recipeCard-2" to={`/recipe/${recipe._id}`}>
      <img src={recipe.image.url} alt="recipeimg" />
      <div className="title-div-2">
      <p className="title-2">{recipe.title}</p>
      <p className="type">{recipe.type}</p>
      </div>
      
      <div className="recipe-category-2">
        <p><span>Cuisine: </span>{recipe.category}</p>
        <p><span>Serves: </span> {recipe.serves}</p>
      </div>
      <div className="like-comment-2">
        <p>
          <BiCommentDetail />
          <span>{recipe.numOfComments}</span>
        </p>
      </div>
    </Link>
    </div>
    </>
  );
}

export default RecipeCard;
    

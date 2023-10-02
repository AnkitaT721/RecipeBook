import React, { useState } from "react";
import "./ProfileRecipeCard.css";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";

function ProfileRecipeCard({ recipe }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleEditClick = () => {
    // Implement edit functionality here
  };

  const handleDeleteClick = () => {
    // Implement delete functionality here
  };
  return (
    <>
    <div className="mainProfileRecipe">
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

      
        <div className="postOptions">
          <SlOptionsVertical
            onClick={() => {
              setIsOptionsOpen(!isOptionsOpen);
            }}
          />
          {isOptionsOpen && (
            <div className="optionsMenu">
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileRecipeCard;

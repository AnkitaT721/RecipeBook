import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import SavedRecipeCard from "./SavedRecipeCard.js";
import Loader from "../layout/Loader/Loader";
import { getSavedRecipes } from "../../actions/userAction";

const SavedRecipes = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);

  const { savedRecipes } = useSelector((state) => state.getSaved);

  useEffect(() => {
    dispatch(getSavedRecipes())
  },[dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData heading={`Saved Posts--${user && user.name}`} />
          <div className="createRecipeContainer">
            <h2 className="createHeading">
              Saved <span>Recipes</span>
            </h2>

            <div className="container" id="container">
              {savedRecipes && savedRecipes.length === 0 ? (
                <p className="no-post">There is 0 saved recipes</p>
              ) : (
                savedRecipes &&
                savedRecipes.map((recipe) => (
                  <SavedRecipeCard recipe={recipe} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SavedRecipes;

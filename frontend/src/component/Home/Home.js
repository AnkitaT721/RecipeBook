import React, { useEffect } from "react";
import Recipe from "./Recipe.js";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getRecipes } from "../../actions/recipeAction.js";
import Loader from "../layout/Loader/Loader.js";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRecipes());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData heading="MyRecipeDiary" />
          <div className="banner">
            <h2>Welcome to Recipe Diary!</h2>
            <p>Where Every Dish Tells a Delicious Story</p>
          </div>

          <h2 className="heading-1">
            Top<span> Recipes</span>
          </h2>

          <div className="container" id="container">
            {recipes && recipes.map((recipe) => <Recipe recipe={recipe} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

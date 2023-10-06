import React, { useEffect } from "react";
import "./UserRecipes.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserRecipes } from "../../actions/recipeAction";
import UserRecipeCard from "./UserRecipeCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const UserRecipes = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userRecipes, loading } = useSelector((state) => state.userRecipes);

  useEffect(() => {
    dispatch(getUserRecipes(id));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
    <>
    <MetaData heading={`Recipe Diary--User Profile`} />
      <div className="userResMain">
        <div className="container" id="container">
          {userRecipes && userRecipes.length === 0 ? (
            <p className="no-post">There is No Post</p>
          ) : (
            userRecipes &&
            userRecipes.map((recipe) => <UserRecipeCard recipe={recipe} />)
          )}
        </div>
      </div>
    </>
    )}
    </>
  );
};

export default UserRecipes;

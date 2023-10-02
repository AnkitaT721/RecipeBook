import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import ProfileRecipeCard from "./ProfileRecipeCard.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userAction";
import { getMyRecipes } from "../../actions/recipeAction";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error, loading = true } = useSelector((state) => state.user);
  const { myRecipes } = useSelector((state) => state.myRecipes);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyRecipes());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profile-container">
            <div className="profile-info">
              <img src={user.profilePic.url} alt={user.name} />
              <h4>{user.name}</h4>
              <p>{user.bio}</p>
              <Link to="/mydetails/update">Edit Profile</Link>
            </div>

            <div className="post-info">
            <h1>My <span>Recipes</span></h1>
              <div className="container" id="container">
                {myRecipes && myRecipes.length === 0 ? (
                  <p className="no-post">Create your first post!</p>
                ) : (
                  myRecipes &&
                  myRecipes.map((recipe) => (
                    <ProfileRecipeCard recipe={recipe} />
                  ))
                )}

                <Link className="create-post">Create Post</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

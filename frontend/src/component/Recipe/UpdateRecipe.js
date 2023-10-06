import React, { useEffect, useState } from "react";
import "./UpdateRecipe.css";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteRecipe,
  editRecipe,
  getRecipeDetails,
} from "../../actions/recipeAction";
import {
  DELETE_RECIPE_RESET,
  UPDATE_RECIPE_RESET,
} from "../../constants/recipeConstants";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader";

const UpdateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { recipe, error } = useSelector((state) => state.recipeDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.editRecipe);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [serves, setServes] = useState(0);
  const [process, setProcess] = useState("");

  const categories = [
    "Indian",
    "North-Indian",
    "South-Indian",
    "Indo-Chinese",
    "Chinese",
    "Mughlai",
    "Italian",
    "Korean",
    "Japanese",
    "American",
    "French",
    "Mexican",
    "Thai",
    "Other",
  ];

  const types = ["veg", "non-veg"];

  const updateRecipeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("ingredients", ingredients);
    myForm.set("category", category);
    myForm.set("type", type);
    myForm.set("serves", serves);
    myForm.set("process", process);

    dispatch(editRecipe(id, myForm));
  };

  const deleteRecipeHandler = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
    }
  };

  useEffect(() => {
    if (recipe && recipe._id !== id) {
      dispatch(getRecipeDetails(id));
    } else {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setCategory(recipe.category);
      setType(recipe.type);
      setServes(recipe.serves);
      setProcess(recipe.process);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Recipe Updated Successfully");
      navigate("/profile");
      dispatch({ type: UPDATE_RECIPE_RESET });
    }

    if (isDeleted) {
      toast.success("Recipe Deleted Successfully");
      navigate("/profile");
      dispatch({ type: DELETE_RECIPE_RESET });
    }
  }, [
    dispatch,
    error,
    updateError,
    deleteError,
    isUpdated,
    isDeleted,
    navigate,
    id,
    recipe
  ]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData heading="Update Recipe" />
          <div className="createRecipeContainer">
            <h2 className="createHeading">
              Update <span>Recipe</span>
            </h2>

            <form
              className="updateRecipeForm"
              encType="multipart/form-data"
              onSubmit={updateRecipeSubmitHandler}
            >
              <div className="updateForm">
                <div>
                  <h4>Title:</h4>
                  <input
                    type="text"
                    placeholder="Recipe Title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <h4>Ingredients:</h4>
                  <input
                    type="text"
                    placeholder="Ingredients"
                    required
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>

                <div>
                  <h4>Cuisine:</h4>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Cuisine</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4>Type:</h4>
                  <select onChange={(e) => setType(e.target.value)}>
                    <option value="">Choose Type</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h4>Serves:</h4>
                  <input
                    type="text"
                    inputmode="numeric"
                    placeholder="Serves"
                    required
                    value={serves}
                    onChange={(e) => setServes(e.target.value)}
                  />
                </div>

                <div id="textarea" style={{ whiteSpace: "pre-line" }}>
                  <h4>Process:</h4>
                  <textarea
                    placeholder="Cooking Process"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    cols="30"
                    rows="3"
                  ></textarea>
                </div>
                <div className="editBtn">
                  <Button
                    id="updateRecipeBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Update
                  </Button>

                  <Button
                    id="deleteRecipeBtn"
                    disabled={loading ? true : false}
                    onClick={deleteRecipeHandler}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateRecipe;

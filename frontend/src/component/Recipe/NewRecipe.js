import React, { useEffect, useState } from "react";
import "./NewRecipe.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import { clearErrors, createRecipe } from "../../actions/recipeAction";
import { NEW_RECIPE_RESET } from "../../constants/recipeConstants";
import Loader from "../layout/Loader/Loader";

const NewRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newRecipe);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [serves, setServes] = useState(0);
  const [process, setProcess] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

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

  const createRecipeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("ingredients", ingredients);
    myForm.set("category", category);
    myForm.set("type", type);
    myForm.set("serves", serves);
    myForm.set("process", process);
    myForm.set("image", image);
    dispatch(createRecipe(myForm));
  };

  const createRecipeImagesChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setTitle(e.target.title);
      setIngredients(e.target.ingredients);
      setCategory(e.target.category);
      setType(e.target.type);
      setServes(e.target.serves);
      setProcess(e.target.process);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Recipe Created Successfully");
      navigate("/profile");
      dispatch({ type: NEW_RECIPE_RESET });
    }
  }, [dispatch, navigate, error, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
    <>
      <MetaData heading="Create Recipe" />
      <div className="createRecipeContainer">
        <h2 className="createHeading">
          Create <span>Recipe</span>
        </h2>

        <form
          className="createRecipeForm"
          encType="multipart/form-data"
          onSubmit={createRecipeSubmitHandler}
        >
          <div className="createForm">
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

            <div id="uploadRecipeImage">
              <h4 className="uploadImage">Upload Image</h4>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={createRecipeImagesChange}
              />
              <img src={imagePreview} alt=""/>
            </div>
            <Button
              id="createRecipeBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
    )}
    </>
  );
};

export default NewRecipe;

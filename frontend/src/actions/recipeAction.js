import axios from "axios";
import {
  ALL_RECIPE_FAIL,
  ALL_RECIPE_REQUEST,
  ALL_RECIPE_SUCCESS,
  CLEAR_ERRORS,
  RECIPE_DETAILS_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
} from "../constants/recipeConstants";

//get product (filters)
export const getRecipes =
  (keyword = "", category, type) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RECIPE_REQUEST });

      let link = `/api/v1/recipes?keyword1=${keyword}`;

      if (category) {
        link = `/api/v1/recipes?keyword1=${keyword}&category=${category}`;
      }

      if (type) {
        link = `/api/v1/recipes?keyword1=${keyword}&category=${category}&type=${type}`;
      }

      if (category === "All") {
        link = `/api/v1/recipes?keyword1=${keyword}`;
      }

      const { data } = await axios.get(link);

      console.log("Category:", category);
      console.log("Type:", type);

      dispatch({
        type: ALL_RECIPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_RECIPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get detailed recipe
export const getRecipeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/recipe/${id}`);

    dispatch({
      type: RECIPE_DETAILS_SUCCESS,
      payload: data.recipe,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

import axios from "axios";
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ALL_RECIPE_FAIL,
  ALL_RECIPE_REQUEST,
  ALL_RECIPE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_RECIPE_FAIL,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  MY_RECIPES_FAIL,
  MY_RECIPES_REQUEST,
  MY_RECIPES_SUCCESS,
  NEW_RECIPE_FAIL,
  NEW_RECIPE_REQUEST,
  NEW_RECIPE_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  UPDATE_RECIPE_FAIL,
  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_SUCCESS,
  USER_RECIPES_FAIL,
  USER_RECIPES_REQUEST,
  USER_RECIPES_SUCCESS,
} from "../constants/recipeConstants";

//get product (filters)
export const getRecipes =
  (keyword = "", currentPage = 1, category, type) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RECIPE_REQUEST });

      let link = `/api/v1/recipes?keyword1=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/recipes?keyword1=${keyword}&category=${category}&page=${currentPage}`;
      }

      if (type) {
        link = `/api/v1/recipes?keyword1=${keyword}&category=${category}&type=${type}&page=${currentPage}`;
      }

      if (category === "All") {
        link = `/api/v1/recipes?keyword1=${keyword}&page=${currentPage}&type=${type}`;
      }

      const { data } = await axios.get(link);

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

//my Recipes
export const getMyRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: MY_RECIPES_REQUEST });

    const { data } = await axios.get(`/api/v1/myposts`);

    dispatch({ type: MY_RECIPES_SUCCESS, payload: data.myRecipes });
  } catch (error) {
    dispatch({
      type: MY_RECIPES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//user Recipes
export const getUserRecipes = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_RECIPES_REQUEST });

    const { data } = await axios.get(`/api/v1/userrecipes/${id}`);

    dispatch({ type: USER_RECIPES_SUCCESS, payload: data.userRecipes });
  } catch (error) {
    dispatch({
      type: USER_RECIPES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//add comment
export const addComment = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/comment`, commentData, config);

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create recipe
export const createRecipe = (recipeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_RECIPE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/recipe/new`, recipeData, config);

    dispatch({
      type: NEW_RECIPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_RECIPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete recipe
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RECIPE_REQUEST });

    const { data } = await axios.delete(`/api/v1/recipe/${id}`);

    dispatch({
      type: DELETE_RECIPE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RECIPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update recipe
export const editRecipe = (id, recipeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_RECIPE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/recipe/${id}`,
      recipeData,
      config
    );

    dispatch({
      type: UPDATE_RECIPE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RECIPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

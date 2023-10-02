import {
  ALL_RECIPE_FAIL,
  ALL_RECIPE_REQUEST,
  ALL_RECIPE_SUCCESS,
  CLEAR_ERRORS,
  MY_RECIPES_FAIL,
  MY_RECIPES_REQUEST,
  MY_RECIPES_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
} from "../constants/recipeConstants";

export const getRecipesReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case ALL_RECIPE_REQUEST:
      return {
        loading: true,
        recipes: [],
      };

    case ALL_RECIPE_SUCCESS:
      return {
        loading: false,
        recipes: action.payload.recipes,
        recipeCount: action.payload.filteredCount
      };

    case ALL_RECIPE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const recipeDetailsReducer = (state = { recipe: {} }, action) => {
  switch (action.type) {
    case RECIPE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RECIPE_DETAILS_SUCCESS:
      return {
        loading: false,
        recipe: action.payload,
      };

    case RECIPE_DETAILS_FAIL:
      return {
        loading: false, 
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const myRecipesReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_RECIPES_REQUEST:
      return {
        loading: true,
      };

    case MY_RECIPES_SUCCESS:
      return {
        loading: false,
        myRecipes: action.payload,
      };

    case MY_RECIPES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

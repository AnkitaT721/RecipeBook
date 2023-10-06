import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESET,
  ADD_COMMENT_SUCCESS,
  ALL_RECIPE_FAIL,
  ALL_RECIPE_REQUEST,
  ALL_RECIPE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_RECIPE_FAIL,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_RESET,
  DELETE_RECIPE_SUCCESS,
  MY_RECIPES_FAIL,
  MY_RECIPES_REQUEST,
  MY_RECIPES_SUCCESS,
  NEW_RECIPE_FAIL,
  NEW_RECIPE_REQUEST,
  NEW_RECIPE_RESET,
  NEW_RECIPE_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  UPDATE_RECIPE_FAIL,
  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_RESET,
  UPDATE_RECIPE_SUCCESS,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL,
  UNLIKE_REQUEST,
  UNLIKE_SUCCESS,
  UNLIKE_FAIL,
  USER_RECIPES_REQUEST,
  USER_RECIPES_SUCCESS,
  USER_RECIPES_FAIL,
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
        filteredCount: action.payload.filteredCount,
        recipeCount: action.payload.recipeCount,
        postsPerPage: action.payload.postsPerPage,
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


export const myRecipesReducer = (state = { myRecipes: [] }, action) => {
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

export const userRecipesReducer = (state = { userRecipes: [] }, action) => {
  switch (action.type) {
    case USER_RECIPES_REQUEST:
      return {
        loading: true,
      };

    case USER_RECIPES_SUCCESS:
      return {
        loading: false,
        userRecipes: action.payload,
      };

    case USER_RECIPES_FAIL:
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

export const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_COMMENT_RESET:
      return {
        ...state,
        success: false,
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

// reducers/recipeReducers.js

export const addLikeReducer = (state = { isLiked: false }, action) => {
  switch (action.type) {
    case ADD_LIKE_REQUEST:
    case UNLIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        isLiked: true,
      };

    case UNLIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        isLiked: false,
      };

    case ADD_LIKE_FAIL:
    case UNLIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const newRecipeReducer = (state = { recipe: {} }, action) => {
  switch (action.type) {
    case NEW_RECIPE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_RECIPE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        recipe: action.payload.recipe,
      };

    case NEW_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_RECIPE_RESET:
      return {
        ...state,
        success: false,
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

export const editRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RECIPE_REQUEST:
    case UPDATE_RECIPE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_RECIPE_FAIL:
    case UPDATE_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_RECIPE_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_RECIPE_RESET:
      return {
        ...state,
        isUpdated: false,
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

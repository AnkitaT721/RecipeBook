import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SAVED_RECIPES_FAIL,
  SAVED_RECIPES_REQUEST,
  SAVED_RECIPES_SUCCESS,
  SAVE_FAIL,
  SAVE_REQUEST,
  SAVE_RESET,
  SAVE_SUCCESS,
  UNSAVE_FAIL,
  UNSAVE_REQUEST,
  UNSAVE_RESET,
  UNSAVE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
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

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
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

export const saveRecipesReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_REQUEST:
    case UNSAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        isSaved: true,
      };

    case UNSAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        unSaved: true,
      };

    case SAVE_FAIL:
    case UNSAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isSaved: false,
      };

      case SAVE_RESET:
        return {
          ...state,
          isSaved: false,
        };

    case UNSAVE_RESET:
      return {
        ...state,
        unSaved: true,
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

export const getSavedReducer = (state = { savedRecipes: [] }, action) => {
  switch (action.type) {
    case SAVED_RECIPES_REQUEST:
      return {
        loading: true,
      };

    case SAVED_RECIPES_SUCCESS:
      return {
        loading: false,
        savedRecipes: action.payload,
      };

    case SAVED_RECIPES_FAIL:
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
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

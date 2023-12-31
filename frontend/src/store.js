import { legacy_createStore as createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addCommentReducer, editRecipeReducer,  getRecipesReducer,  myRecipesReducer, newRecipeReducer, recipeDetailsReducer, userRecipesReducer } from "./reducers/recipeReducer";
import { allUsersReducer, forgotPasswordReducer, getSavedReducer, saveRecipesReducer, updateProfileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    recipes: getRecipesReducer,
    recipeDetails: recipeDetailsReducer,
    user:userReducer,
    myRecipes: myRecipesReducer,
    updateProfile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    addComment: addCommentReducer,
    newRecipe: newRecipeReducer,
    editRecipe: editRecipeReducer,
    saveRecipes: saveRecipesReducer,
    getSaved: getSavedReducer,
    userRecipes: userRecipesReducer,
    allUsers: allUsersReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import { legacy_createStore as createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addCommentReducer, getRecipesReducer, myRecipesReducer, recipeDetailsReducer } from "./reducers/recipeReducer";
import { forgotPasswordReducer, updateProfileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    recipes: getRecipesReducer,
    recipeDetails: recipeDetailsReducer,
    user:userReducer,
    myRecipes: myRecipesReducer,
    updateProfile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    addComment: addCommentReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

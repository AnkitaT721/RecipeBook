import { legacy_createStore as createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getRecipesReducer, recipeDetailsReducer } from "./reducers/recipeReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    recipes: getRecipesReducer,
    recipeDetails: recipeDetailsReducer,
    user:userReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

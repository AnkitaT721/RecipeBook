import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar/Navbar";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import RecipeDetails from "./component/Recipe/RecipeDetails";
import Recipes from "./component/Recipe/Recipes";
import Search from "./component/Recipe/Search";
import LoginSignup from "./component/User/LoginSignup";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import NewRecipe from "./component/Recipe/NewRecipe";
import UpdateRecipe from "./component/Recipe/UpdateRecipe";
import SavedRecipes from "./component/Recipe/SavedRecipes";
import UserRecipes from "./component/Recipe/UserRecipes";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import NotFound from "./component/layout/NotFound/NotFound";
import AllUsers from "./component/User/AllUsers";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:keyword" element={<Recipes />} />

          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/login" element={<LoginSignup />} />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/users" element={<AllUsers />} />
          <Route path="/profile/:id" element={<UserRecipes />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/mydetails/update" element={<UpdateProfile />} />
            <Route path="/recipe/new" element={<NewRecipe />} />
            <Route path="profile/update/:id" element={<UpdateRecipe />} />
            <Route path="/profile/saved" element={<SavedRecipes />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;

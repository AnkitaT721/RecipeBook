import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar/Navbar.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import RecipeDetails from "./component/Recipe/RecipeDetails.js";
import Recipes from "./component/Recipe/Recipes.js";
import Search from "./component/Recipe/Search.js";
import LoginSignup from "./component/User/LoginSignup";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {
  // const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  });

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

          <Route path="/login" element={<LoginSignup />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/mydetails/update" element={<UpdateProfile />} />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* <Route element={isAuthenticated && <ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/profile" element={<Profile />} />
          </Route> */}
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar/Navbar.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import RecipeDetails from "./component/Recipe/RecipeDetails.js";
import Recipes from "./component/Recipe/Recipes.js";
import Search from "./component/Recipe/Search.js";
import LoginSignup from "./component/User/LoginSignup";

function App() {
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
      </Routes>

      <Footer />
    </div>
    </>
  );
}

export default App;

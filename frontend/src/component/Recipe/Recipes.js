import React, { useEffect, useState } from "react";
import "./Recipes.css";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getRecipes } from "../../actions/recipeAction.js";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const categories = [
  "Indian",
  "North-Indian",
  "South-Indian",
  "Indo-Chinese",
  "Chinese",
  "Mughlai",
  "Italian",
  "Korean",
  "Japanese",
  "American",
  "French",
  "Mexican",
  "Thai",
  "Other",
  "All",
];

const types = ["veg", "non-veg"];

const Recipes = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, error, recipes, filteredCount, postsPerPage, recipeCount } = useSelector((state) => state.recipes);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category);
  };

  const handleTypeClick = (type) => {
    setType(type);
    setSelectedType(type);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRecipes(keyword, currentPage, category, type));
  }, [dispatch, error, keyword, category, type, currentPage]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
    <>
    <MetaData heading={`All Recipes(${currentPage})`} />
      <div className="all-recipes">
        <div className="side-bar">
          <h3 className="filter-heading">Filter Recipes</h3>

          <Typography>
            <h4 className="select-cuisine">Select Cuisine:</h4>
            <ul className="category-box">
              {categories.map((category) => (
                <li
                className={`category-link ${selectedCategory === category ? "active" : ""}`}
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {/* <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                > */}
                  {category}
                </li>
              ))}
            </ul>
          </Typography>

          <Typography>
            <h4 className="select-type">Select Type:</h4>
            <ul className="category-box">
              {types.map((type) => (
                <li
                className={`category-link ${selectedType === type ? "active" : ""}`}
                key={type}
                onClick={() => handleTypeClick(type)}
              >
                {/* <li
                  className="category-link"
                  key={type}
                  onClick={() => setType(type)}
                > */}
                  {type}
                </li>
              ))}
            </ul>
          </Typography>
        </div>

        <div className="recipes-right">
          <h2 className="recipe-heading">All <span>Recipes</span></h2>

          <div className="recipes">
            {recipes && recipes.map((recipe) => <RecipeCard recipe={recipe} />)}
          </div>
          <h2 className="no-recipes">
            {filteredCount === 0
              ? "No Recipes Found!" : ''}
          </h2>

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={postsPerPage}
              totalItemsCount={recipeCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </div>
      </div>
    </>
      )}
    </>
  );
};

export default Recipes;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = () => {
    const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/recipes/${keyword}`);
    } else {
      navigate("/recipes");
    }
  };

  return (
    <>
    <MetaData heading="Recipe Diary--Search" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search for Recipes..."
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type="submit" value="search" />
      </form>
    </>
  );
}

export default Search;

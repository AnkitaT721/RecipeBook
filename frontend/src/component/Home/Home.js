import React from 'react';
import Recipe from "./Recipe.js";
import "./Home.css";
import MetaData from '../layout/MetaData.js';

const Home = () => {
    const recipe={
        title: "Biryani",
        ingredients: "chicken, rice",
        category: "Mughlai",
        type: "non-veg",
        serves: 4,
        likeCount: 0,
        numOfComments: 0,
        _id:"bir",
        images: [{ url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg"}]
    }
  return (
    <>
    <MetaData heading="MyRecipeDiary" />
      <div className="banner">
        <h2>Welcome to Recipe Diary!</h2>
        <p>Where Every Dish Tells a Delicious Story</p>
      </div>

      <h2 className='heading-1'>Top<span> Recipes</span></h2>

      <div className="container" id='container'>
        <Recipe recipe={recipe} />
        <Recipe recipe={recipe} />
      </div>
    </>
  );
}

export default Home;

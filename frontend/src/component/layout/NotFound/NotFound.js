import React from 'react';
import "./NotFound.css";
import picture from "../../../images/notFound.png"
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <img src={picture} alt="" />
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;

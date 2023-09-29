import React, { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className={showMenu ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Recipes</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        </div>

        <div className="profile">
          <ul className="profile-desktop">
            <li>
              <Link to="/">
                <FiSearch />
              </Link>
            </li>
            <li>
              <Link to="/">
                <BiSolidUserCircle className="user" />
              </Link>
            </li>

            <li>
              <Link to="/">
                <FiLogOut className="logout" />
              </Link>
            </li>
          </ul>

          <div className="hamburger">
            <Link to="/" onClick={() => setShowMenu(!showMenu)}>
              <GiHamburgerMenu />
            </Link>
            <Link to="/">
                <FiSearch />
              </Link>
            <Link>
              <BiSolidUserCircle />
            </Link>
            <Link>
              <FiLogOut />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import logo from "../../../images/logo.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector((state) => state.user)

  const logoutUserHandler = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully")
  }

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
              <Link to="/recipes">Recipes</Link>
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
              <Link to="/search">
                <FiSearch />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <BiSolidUserCircle className="user" />
              </Link>
            </li>

            <li>
              <Link to="/">
                <FiLogOut className={isAuthenticated ? "logout" : "no-logout"} onClick={logoutUserHandler}/>
              </Link>
            </li>
          </ul>

          <div className="hamburger">
            <Link onClick={() => setShowMenu(!showMenu)}>
              <GiHamburgerMenu />
            </Link>
            <Link to="/search">
                <FiSearch />
              </Link>
            <Link to="/login">
              <BiSolidUserCircle />
            </Link>
            <Link to="/">
            <FiLogOut className={isAuthenticated ? "logout" : "no-logout"} onClick={logoutUserHandler}/>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

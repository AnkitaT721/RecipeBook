import React, { useState } from "react";
import logo from "../../../images/logo.png";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
  const location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.user);

  const logoutUserHandler = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };

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
              <NavLink
                to="/"
                className={location.pathname === "/" ? "active-link" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recipes"
                className={
                  location.pathname === "/recipes" ? "active-link" : ""
                }
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={
                  location.pathname === "/contact" ? "active-link" : ""
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={location.pathname === "/about" ? "active-link" : ""}
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to={isAuthenticated ? "/recipe/new" : "/login"}
                className={
                  location.pathname ===
                  (isAuthenticated ? "/recipe/new" : "/login")
                    ? "active-link"
                    : ""
                }
              >
                Create
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="profile">
          <ul className="profile-desktop">
            <li>
              <NavLink to="/search" activeClassName="active-link">
                <FiSearch />
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active-link">
                <BiSolidUserCircle className="user" />
              </NavLink>
            </li>

            <li>
              <NavLink to="/" activeClassName="active-link">
                <FiLogOut
                  className={isAuthenticated ? "logout" : "no-logout"}
                  onClick={logoutUserHandler}
                />
              </NavLink>
            </li>
          </ul>

          <div className="hamburger">
            <NavLink onClick={() => setShowMenu(!showMenu)}>
              <GiHamburgerMenu />
            </NavLink>
            <NavLink to="/search">
              <FiSearch />
            </NavLink>
            <NavLink to="/login">
              <BiSolidUserCircle />
            </NavLink>
            <NavLink to="/">
              <FiLogOut
                className={isAuthenticated ? "logout" : "no-logout"}
                onClick={logoutUserHandler}
              />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

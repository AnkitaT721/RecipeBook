import React from "react";
import logo from "../../images/logo2.png";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="main">
        <div className="logo-f">
          <img src={logo} alt="logo" />
        </div>

        <div className="text">
          <p>© 2023 MyRecipeDiary. All Rights Reserved.</p>
          <p>Designed and Created by Ankita Talukadr</p>
        </div>

        <div className="social">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <a href="https://www.instagram.com/_.ankita_t._/" target="_blank"  rel="noreferrer">
                <FaInstagram />
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100011821989387"
                target="_blank"  rel="noreferrer"
              >
                <FaFacebook />
                Facebook
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/ankita-talukdar-3569a5280/"
                target="_blank"  rel="noreferrer"
              >
                <FaLinkedin />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;

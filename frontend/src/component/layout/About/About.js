import React from "react";
import "./About.css";
import { Avatar, Button, Typography } from "@mui/material";
// import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import MetaData from "../MetaData";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/_.ankita_t._/";
  };
  return (
    <>
      <MetaData title="About Us" />
      <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>

          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://res.cloudinary.com/daoqage0i/image/upload/v1692226398/samples/ankita_bnbqyy.jpg"
                alt="Founder"
              />
              <Typography>Ankita Talukdar</Typography>
              <Button onClick={visitInstagram} color="primary">
                Visit Instagram
              </Button>
              <span>
                Welcome to Your Recipe Diary! We're a passionate community of
                food lovers dedicated to sharing delicious recipes and the joy
                of cooking. Whether you're a seasoned chef or a beginner, join
                us in celebrating the art of food and the stories it tells.
                Explore our diverse recipe collection, and embark on a flavorful
                journey with us. Happy Cooking!
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Social Links</Typography>
              <a href="https://github.com/AnkitaT721" target="blank">
                <BsGithub className="icon" />
              </a>

              <a
                href="https://www.linkedin.com/in/ankita-talukdar-3569a5280/"
                target="blank"
              >
                <BsLinkedin className="icon" />
              </a>

              <a href="https://www.instagram.com/_.ankita_t._/" target="blank">
                <BsInstagram className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

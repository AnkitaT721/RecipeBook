import React, { useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import { AiOutlineMail } from "react-icons/ai";
import { SlLockOpen } from "react-icons/sl";
import { MdAccountCircle } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../images/user.png";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const LoginSignup = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [activeTab, setActiveTab] = useState("login"); // For MetaData

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password, bio } = user;

  const [profilePic, setProfilePic] = useState();
  const [profilePicPreview, setProfilePicPreview] = useState(profile);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("bio", bio);
    myForm.set("profilePic", profilePic);

    dispatch(register(myForm))
  };

  const registerDataChange = (e) => {
    if (e.target.name === "profilePic") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePicPreview(reader.result);
          setProfilePic(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }

    setActiveTab(tab); // For MetaData
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${activeTab === "login" ? "Login" : "Register"}`} />

          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <AiOutlineMail />
                  <input
                    type="ema il"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <SlLockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <MdAccountCircle />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <SlLockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpBio">
                  <BsChatLeftText />
                  <input
                    type="text"
                    placeholder="Add a bio"
                    required
                    name="bio"
                    value={bio}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={profilePicPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignup;

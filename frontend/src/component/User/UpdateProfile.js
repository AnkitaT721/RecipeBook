import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { MdAccountCircle } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProfile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [profilePicPreview, setProfilePicPreview] = useState(profilePic);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("bio", bio);
    myForm.set("profilePic", profilePic);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    // e.preventDefault();
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicPreview(reader.result);
        setProfilePic(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
      setProfilePicPreview(user.profilePic && user.profilePic.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData heading="Update Profile" />
          <div className="update-profile-main">
            <div className="update-profile-box">
              <h2 className="update-profile-title">
                Update <span>Profile</span>
              </h2>
              <div className="update-profile-form">
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div id="updateProfileImage">
                    <img src={profilePicPreview} alt="Avatar Preview" />
                  </div>

                  <div className="updateDetails">
                    <div className="updateProfileName">
                      <MdAccountCircle />
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="updateProfileName">
                      <AiOutlineMail />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="updateProfileName">
                      <BsChatLeftText />
                      <input
                        type="text"
                        placeholder="Bio"
                        required
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>

                    <div id="updateImage">
                      <input
                        type="file"
                        name="profilePic"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Update"
                      className="updateProfileBtn"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProfile;

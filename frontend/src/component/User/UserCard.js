import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <>
    <Link className="userCard" to={`/profile/${user._id}`}>
      <div className="userCardMain">
        <img src={user.profilePic.url} alt="" />
        <div className="userInfo">
          <div>
            <h4 className="userName" >
              {user.name}
            </h4>
            <div className="userBio">
              <p className="type">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </>
  );
};

export default UserCard;

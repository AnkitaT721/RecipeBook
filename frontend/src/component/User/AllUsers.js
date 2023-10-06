import React, { useEffect } from "react";
import "./AllUsers.css";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <div className="user-info">
        <h1>
          All <span>Users</span>
        </h1>
        <div className="container2" id="container2">
          {users && users.length === 0 ? (
            <p className="no-user">No Users Found</p>
          ) : (
            users && users.map((user) => <UserCard user={user} />)
          )}
        </div>
      </div>
    </>
  );
};

export default AllUsers;

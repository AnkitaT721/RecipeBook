import React, { useEffect } from "react";
import "./AllUsers.css";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
    <>
    <MetaData heading={`Recipe Diary--All Users`} />
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
    )}
    </>
  );
};

export default AllUsers;

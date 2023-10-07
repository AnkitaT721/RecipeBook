import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.allUsers);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

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
            <div className="search-container">
              <input
                type="text"
                placeholder="Search users by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="container2" id="container2">
              {users && users.length === 0 ? (
                <p className="no-user">No Users Found</p>
              ) : (
                filteredUsers.map((user) => (
                  <UserCard user={user} key={user._id} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;

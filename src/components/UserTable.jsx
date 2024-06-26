import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, deleteUser } from "../features/user-module/userAction";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const { users, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);

  useEffect(() => {
    const getAllUserList = async () => {
      try {
        await dispatch(getUserList()).unwrap();
      } catch (error) {
        console.log("ERROR IN GET ALL USER LIST ::: ", error);
      }
    };

    getAllUserList();
  }, [dispatch]);

  useEffect(() => {
    setFilteredUser(
      users?.filter((user) =>
        `${user.firstname} ${user.lastname} ${user.email} ${user.age}`
          .toLowerCase()
          .includes(searchQuery)
      )
    );
  }, [searchQuery, users]);

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      await dispatch(getUserList()).unwrap();
    } catch (error) {
      console.log("ERROR IN DELETE USER ::: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div
          style={{
            padding: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser?.length > 0 ? (
                filteredUser?.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm mx-1"
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;

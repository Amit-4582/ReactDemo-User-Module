import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getUserById,
  updateUserById,
} from "../features/user-module/userAction";
import { useNavigate, useParams } from "react-router-dom";

const AddEditUserComponent = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, currentUser } = useSelector((state) => state);

  useEffect(() => {
    if (userId) {
      const fetchUserDetail = async () => {
        try {
          await dispatch(getUserById(userId)).unwrap();
        } catch (error) {
          console.log("ERROR IN FETCH USER ::: ", error);
        }
      };
      fetchUserDetail();
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId && currentUser) {
      setFirstname(currentUser.firstname);
      setLastname(currentUser.lastname);
      setEmail(currentUser.email);
      setAge(currentUser.age);
    } else {
      setFirstname("");
      setLastname("");
      setEmail("");
      setAge("");
      setErrors({});
    }
  }, [userId, currentUser]);

  const validate = () => {
    let tempErrors = {};
    if (!firstname) tempErrors.firstname = "First name is required";
    if (!lastname) tempErrors.lastname = "Last name is required";
    if (!email) tempErrors.email = "Email is required";
    return tempErrors;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value
        ? ""
        : `${id.charAt(0).toUpperCase() + id.slice(1)} is required`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length === 0) {
      const userData = { firstname, lastname, email, age };
      try {
        await dispatch(addUser(userData)).unwrap();
        navigate("/");
      } catch (error) {
        console.log("ERROR IN HANDLE SUBMIT ::: ", error);
      }
    } else {
      setErrors(tempErrors);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length === 0) {
      const userData = { firstname, lastname, email, age };
      try {
        await dispatch(updateUserById({ userId, userData })).unwrap();
        navigate("/");
      } catch (error) {
        console.log("ERROR IN HANDLE UPDATE ::: ", error);
      }
    } else {
      setErrors(tempErrors);
    }
  };

  const handleReset = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setAge("");
    setErrors({});
  };

  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <form onSubmit={userId && currentUser ? handleUpdate : handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="firstname"
              style={{ fontWeight: "bold" }}
              className="form-label"
            >
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              onBlur={handleBlur}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "4px",
                border: errors.firstname
                  ? "1px solid red"
                  : "1px solid #ced4da",
              }}
            />
            {errors.firstname && (
              <small style={{ color: "red" }}>{errors.firstname}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="lastname"
              style={{ fontWeight: "bold" }}
              className="form-label"
            >
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              onBlur={handleBlur}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "4px",
                border: errors.lastname ? "1px solid red" : "1px solid #ced4da",
              }}
            />
            {errors.lastname && (
              <small style={{ color: "red" }}>{errors.lastname}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              style={{ fontWeight: "bold" }}
              className="form-label"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "4px",
                border: errors.email ? "1px solid red" : "1px solid #ced4da",
              }}
            />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="age"
              style={{ fontWeight: "bold" }}
              className="form-label"
            >
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {userId && currentUser ? (
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "48%",
                  padding: "10px",
                  borderRadius: "4px",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                }}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "48%",
                  padding: "10px",
                  borderRadius: "4px",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}

            <button
              type="reset"
              className="btn btn-danger"
              style={{
                width: "48%",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#dc3545",
                borderColor: "#dc3545",
              }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditUserComponent;

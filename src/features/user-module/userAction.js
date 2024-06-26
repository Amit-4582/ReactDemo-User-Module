import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addUser = createAsyncThunk(
    "users/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8080/user-module/add-user", userData);
            if (response.status === 201) {
                toast.success(response.data.message);
                return response.data;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add user");
            return rejectWithValue(error.message);
        }
    }
);

export const getUserList = createAsyncThunk(
    "users/getUserList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8080/user-module/users");
            if (response.status === 200) {
                return response.data.data;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch user list");
            return rejectWithValue(error.message);
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUserById", async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/user-module/edit-user/${userId}`);
            if (response.status === 200) {
                return response.data
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch user data");
            return rejectWithValue(error.message);
        }
    })


export const updateUserById = createAsyncThunk(
    "users/updateUserById",
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8080/user-module/update-user/${userId}`, userData);
            if (response.status === 200) {
                toast.success(response.data.message);
                return response.data;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to update user");
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:8080/user-module/delete-user/${userId}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                return userId;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to delete user");
            return rejectWithValue(error.message);
        }
    }
);
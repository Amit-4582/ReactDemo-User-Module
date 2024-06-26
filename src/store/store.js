import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user-module/userSlice"

export const store = configureStore({
    reducer: userReducer
})
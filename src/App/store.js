import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import blogSlice from "./features/blogSlice";


const store = configureStore(
  {
    reducer: {
      user: authSlice,
      blog: blogSlice
    }
  },
  applyMiddleware(thunk)
)

export default store

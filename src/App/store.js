import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import blogSlice from "./features/blogSlice";
import commentSlice from "./features/commentSlice";

const store = configureStore(
  {
    reducer: {
      user: authSlice,
      blog: blogSlice,
      commentadd: commentSlice
    }
  },
  applyMiddleware(thunk)
)

export default store

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  error: "",
  message: "",
  loading: false,
  commentMessage: "",
};

export const addComment = createAsyncThunk(
  "users/addcomment",
  async (body, { rejectWithValue }) => {
    console.log(body, " Addcomm body =");
    const response = await axios.post(
      "http://localhost:7000/blog/addcomment",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
);

const commentSlice = createSlice({
  name: "commentadd",
  initialState,
  extraReducers: {
    //----------------------------AddComment Reducer----------------//
    [addComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("Addcomment Payload Fulfiled", payload);
      if (payload.data.success) {
        state.commentMessage = payload.data.comment;
        state.message = payload.message
      } else {
        state.errorrror = payload.error.message;
      }
    },
    [addComment.rejected]: (state, payload) => {
      state.loading = false;
      console.log("Addcomment Payload Rejected", payload);
      state.error = payload.error.message;
    },
  },
});
export default commentSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  error: "",
  message: "",
  loading: false,
  user_id: "",
  blog_data: "",
  myblog_data: "",
  user: "",
};

export const blogListApi = createAsyncThunk(
  "users/bloglist",
  async (body, { rejectWithValue }) => {
    console.log("Body  = ", body, rejectWithValue )
    const response = await axios.get(
      "http://localhost:7000/blog/list",
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

export const createBlogApi = createAsyncThunk(
  "users/createBlog",
  async (requestData, { rejectWithValue }) => {
    console.log(requestData, "body");
    const response = await axios.post(
      "http://localhost:7000/blog/create",
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }
);

export const blogDetailApi = createAsyncThunk(
  "users/Blogdetails",
  async (body, { rejectWithValue }) => {
    console.log(body, " blogdetail body =");
    const response = await axios.get(
      `http://localhost:7000/blog/details/${body}`,
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: {

//---------------------createBlogApi reducer-------------------//    
    [createBlogApi.pending]: (state) => {
      state.loading = true;
    },

    [createBlogApi.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("Fulfilled =", payload);
      if (payload.data.success) {
        state.message = payload.data.message;
      } else {
        state.error = payload.error.message;
      }
    },
    [createBlogApi.rejected]: (state, payload) => {
      console.log("Rejected =", payload);
      state.loading = false;
      state.error = payload.error.message;
    },

//---------------blogListApi reducer----------------------------//    
    [blogListApi.pending]: (state) => {
      state.loading = true;
    },

    [blogListApi.fulfilled]: (state, { payload }) => {
      state.loading = false
      console.log("Fulfilled =", payload);
      state.message = payload.message;
      state.blog_data = payload.data;
    },

    [blogListApi.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log("Rejected =", payload);
      // state.error=payload.data.error;
    },

//--------------------------blogDetails reducer---------------------------//
[blogDetailApi.pending]: (state) => {
  state.loading = true;
},

[blogDetailApi.fulfilled]: (state,  {payload} ) => {
  state.blog_data=payload.data.blogs;
  console.log("Fulfiled payload  blogdetail= ",payload)
  
},

[blogDetailApi.rejected]: (state, {payload}) => {
  state.loading=false;
  console.log("Rejected payload  blogdetail= ",payload)
  state.error=payload.data.error;
},

  },
});

export default blogSlice.reducer;

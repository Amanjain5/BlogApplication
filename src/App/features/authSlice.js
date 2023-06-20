import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  error: "",
  message: "",
  loading: false,
  success: "",
  user: "",
  token: "",
};

//----------------Signup API integration start--------------//
export const signupApi = createAsyncThunk(
  "user/SignUpUser",
  async (body, thunkAPI) => {
    console.log("Body:", body);

    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    const resResult = await axios.post(
      "http://localhost:7000/user/create",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log("res:", resResult);

    if (resResult.data.success) {
      return resResult.data;
    } else {
      return thunkAPI.rejectWithValue(resResult.data);
    }
  }
);
//---------------Signup API integration END--------------//


//---------------Login API Integration Start-----------------//
export const loginApi = createAsyncThunk(
  "user/login",
  async (body, thunkAPI) => {
    console.log("Body =", body);
    const res = await fetch("http://localhost:7000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("res data", res);

    let data = await res.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
//---------------------------------Login API Integration END-----------------//


//---------------------------------Forgot Password API Start---------------------//
export const forgotPasswordApi = createAsyncThunk(
  "user/login",
  async (body, thunkAPI) => {
    console.log("Body =", body);
    const res = await fetch(
      "http://localhost:7000/user/send-reset-password-email",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    console.log("res data", res);

    let data = await res.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
//--------------------------------------Forgot Password API END------------------------//


//----------------------------------Reset Password API Start-------------------------//
export const resetPasswordApi = createAsyncThunk(
  "users/resetPassword",
  async (body, { rejectWithValue }) => {
    const response = await axios.post(
      `http://localhost:7000/user/reset-password/${body.id}/${body.token}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data", body);
    return response;
  }
);
//--------------------------Reset Password API END------------------------------------//



//-------------------------------Reducer+Action----------------------------//
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
  clearState : (state) => {
    state.message = ""
    state.error = ""
  }
  },
  extraReducers: {

    //----------------signupApi reducer Start-------------//
    [signupApi.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    },
    [signupApi.fulfilled]: (state, { payload }) => {
      console.log("fulpay", payload);
      state.loading = false;
      if (payload.error) {
        console.log("paysuc", payload.error);
        state.message = "";
        state.error = payload.error;
        console.log("pay", payload);
      } else {
        state.error = "";
        state.message = payload.message;
      }
    },
    [signupApi.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.message = "";
      console.log("rej pay", payload);
    },
    //----------------------signupApi Reducer End--------------//


    //------------LoginApi Reducer Start--------------//
    [loginApi.pending]: (state) => {
      state.loading = true;
    },
    [loginApi.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("Payload fullfiled", payload)

      if (payload.success) {
        state.message = payload.message;
        state.token = payload.token;
        state.user = payload.user;
        localStorage.setItem("message", payload.message);
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
      } else {
        state.error = payload.error;
      }
    },
    [loginApi.rejected]: (state, payload) => {
      console.log("Payload rejected", payload)
      state.loading = false;
      state.error = payload.error.message;
      state.message = "";
    },
    //------------------------LoginApi Reducer END---------------//

    
    
    //-----------------------Reset Password API Start-------------------//
    [resetPasswordApi.pending]: (state, { payload }) => {
      state.loading = true;
      state.message = "";
      state.error = "";
      console.log("Pending =", payload);
    },
    [resetPasswordApi.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("fulfilled = ", payload);
      if (payload.data.success) {
        state.loading = false;
        state.message = payload.data.message;
        // state.success = payload.success.message
      } else {
        state.error = payload.data.message;
      }
    },
    [resetPasswordApi.rejected]: (state, { payload }) => {
      console.log("rejected = ", payload);
      state.loading = false;
      state.error = payload.error.message;
    },
    //---------------------Reset Password API END---------------------------------//
  },
});

export default authSlice.reducer;


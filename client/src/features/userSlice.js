import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  authData: {},
};

export const signup = createAsyncThunk("user/signup", async (data) => {
  try {
    const response = await api.signUp(data);
    return response.data;
  } catch (err) {
    if (err.response.data.message.code === 11000) {
      // Show a toast "Email address had already been taken."
      console.log("Email already taken");
    } else {
      console.error(err);
    }
  }
});

export const signin = createAsyncThunk("user/signin", async (data) => {
  try {
    const response = await api.signIn(data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.isLoading = false;
      state.authData = action.payload;
    },
    [signup.rejected]: (state) => {
      state.isLoading = false;
    },
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action.payload;
    },
    [signin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

//export const {} = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:5432/signup";

const initialState = {
  authData: {},
};

export const signup = createAsyncThunk("user/signup", async (data) => {
  try {
    const response = await axios.post(url, data);
    //console.log(response.data);
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
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      state.user = action.payload;
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.authData = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { auth, removeItem, increase, decrease, calculateTotals } =
  userSlice.actions;

export default userSlice.reducer;

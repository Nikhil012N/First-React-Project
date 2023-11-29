import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import md5 from "md5";
import cryptoRandomString from "crypto-random-string";

export const signin = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:8080/register");
  return response?.data;
});

export const signup = createAsyncThunk(
  "users/post",
  async ({values, previewImage}) => {
    await axios
      .post("http://localhost:8080/register", {
        userName: values?.userName,
        email: values?.email,
        password: md5(values?.password),
        cPassword: values?.cPassword,
        token: cryptoRandomString({ length: 20 }),
        myimage: previewImage,
      }).then((res) => console.log("success data transfer", res?.data,"thisimg", previewImage));
  }
);

const loginSlice = createSlice({
  name: "apidata",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [signup.rejected]: (state,action) => {
      state.loading = false;
      state.error=action.error;
    },
    [signin.pending]: (state) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error=action.error;
    },

  },
});

export default loginSlice.reducer;

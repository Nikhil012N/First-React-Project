import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginslice";
import dummyApiSlice from "./Slices/dummyapislice";
const store = configureStore({
  reducer:{
    loginapi:loginSlice,
    dummyapi:dummyApiSlice
  } ,
});

export default store;

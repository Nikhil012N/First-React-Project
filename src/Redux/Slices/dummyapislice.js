import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const dummyApiProducts = createAsyncThunk(
  "dummyapi/products",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response?.data?.products;
  }
);

export const dummyApiSearch = createAsyncThunk(
  "dummyapi/search",
  async (search) => {
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${search}`
    );
    return response?.data?.products;
  }
);

export const dummyApiCategory = createAsyncThunk(
  "dummyapi/category",
  async () => {
    const response = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    return response?.data;
  }
);
export const dummyApiCatPro = createAsyncThunk(
  "dummyapi/categorybyproduct",
  async (cd) => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${cd}`
    );
    console.log("my cd data",response?.data?.products);
    return response?.data?.products;
  }
);

export const dummyApiProductID = createAsyncThunk(
  "dummyapi/categorybyID",
  async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return [response?.data];}
);

const dummpyApiSlice = createSlice({
  name: "dummyapi",
  initialState: {
    data: [],
    catdata:null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dummyApiProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(dummyApiProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        console.log("dummy data",state.data);
      })
      .addCase(dummyApiProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(dummyApiSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(dummyApiSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(dummyApiSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(dummyApiCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(dummyApiCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.catdata = action.payload;
      })
      .addCase(dummyApiCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(dummyApiCatPro.pending, (state) => {
        state.loading = true;
      })
      .addCase(dummyApiCatPro.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(dummyApiCatPro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(dummyApiProductID.pending, (state) => {
        state.loading = true;
      })
      .addCase(dummyApiProductID.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(dummyApiProductID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export default dummpyApiSlice.reducer;

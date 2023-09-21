import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const statuses = Object.freeze({
  IDEL: "idel",
  ERROR: "error",
  LOADING: "loading",
});
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: statuses.IDEL,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductTunk(dispatch, getState) {
    dispatch(setStatus(statuses.LOADING));

    try {
      const res = await fetch("https://dummyjson.com/products");

      const data = await res.json();

      dispatch(setProducts(data.products));
      console.log(data, "data");
      dispatch(setStatus(statuses.IDLE));
    } catch (err) {
      console.log(err);

      dispatch(setStatus(statuses.ERROR));
    }
  };
}

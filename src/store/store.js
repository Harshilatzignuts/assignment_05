import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Redux/ProductSlice";
import authReducer from "../Redux/AuthSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
  },
});

export default store;

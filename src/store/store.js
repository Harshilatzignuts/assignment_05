import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/ProductSlice";
import authReducer from "../redux/AuthSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
  },
});

export default store;

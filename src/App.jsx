import SignUp from "./component/auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import ProductList from "./component/product/ProductList";
import store from "./store/store";
import { Provider } from "react-redux";
import { AllUserData } from "./redux/AuthSlice";
import { useDispatch } from "react-redux";
import ChangePassword from "./component/change-passoword/ChangePassword";
import ProductDetail from "./component/product/ProductDetail";
import EditProfile from "./component/edit-profile/EditProfile";
import { useEffect } from "react";
import Login from "./component/auth/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllUserData());
  }, [dispatch]);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<SignUp />}></Route>
            <Route path="/login" exact element={<Login />}></Route>

            <Route
              exact
              path="/products"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/change-password"
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

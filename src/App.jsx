import SignUp from "./Component/Auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import ProductList from "./Component/Product/ProductList";
import store from "./store/store";
import { Provider } from "react-redux";
import { AllUserData } from "./Redux/AuthSlice";
import { useDispatch } from "react-redux";
import ChangePassword from "./Component/ChangePassoword/ChangePassword";
import ProductDetail from "./Component/Product/ProductDetail";
import EditProfile from "./Component/EditProfile/EditProfile";
import { useEffect } from "react";

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

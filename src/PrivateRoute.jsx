import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("currentUser")).auth;
  const navigate = useNavigate();
  useEffect(() => {
    if (auth === false) {
      navigate("/login");
    }
  }, [auth]);
  console.log(auth);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

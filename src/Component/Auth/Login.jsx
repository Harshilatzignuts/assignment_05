import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../schemas";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/AuthSlice";
import { AllUserData } from "../../Redux/AuthSlice";
import bcrypt from "bcryptjs";
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [loginError, setLoginError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: (values, { setSubmitting, setFieldError }) => {
        console.log(users);
        const { email, password } = values;

        // console.log(email, password);
        const user = users.find((user) => user.email === email);
        // console.log(user.password);

        if (!user) {
          setLoginError("User not found");
          setSubmitting(false);
          return;
        }

        if (user && bcrypt.compareSync(password, user.password)) {
          //state.currentUser = { auth: true, user };
          // Dispatch the login action to set the current user
          dispatch(login(user));
          dispatch(AllUserData());
          // Redirect to the private screen (change the path as needed)
          Navigate("../products");
        } else {
          setLoginError("Incorrect password");
          setSubmitting(false);
          return;
        }
      },
    });
  return (
    <div>
      <div className="container">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">Welcome</h1>
              <p className="modal-desc">To the Assignment.</p>
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}
                </div>
                {loginError && <div className="form-error">{loginError}</div>}
                <div className="modal-buttons">
                  <button className="input-button" type="submit">
                    Submit
                  </button>
                </div>
                <p className="sign-up">
                  Don't have an account?{" "}
                  <Link className="ms-2" to="/">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

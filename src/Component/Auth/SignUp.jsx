import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas";
import "./styled/authStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile_number: "",
  password: "",
  confirm_password: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const [signUpError, setSignUpError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, { setSubmitting }) => {
        //console.log(users);
        const user = users.find((user) => user.email === values.email);
        // console.log(user);
        // console.log(user.email);
        // console.log(values.email);
        if (user) {
          setSignUpError("User Already axist");
          setSubmitting(false);
          return;
        } else {
          dispatch(addUser(values));
          Navigate("/login");
          console.log("User Registration Successfully ");
        }
      },
    });

  //console.log(Formik);localStorage.setItem("users", JSON.stringify(values));

  return (
    <>
      <div className="container">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">Welcome</h1>
              <p className="modal-desc">To the Assignment.</p>
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label htmlFor="name" className="input-label">
                    First Name
                  </label>
                  <input
                    type="name"
                    autoComplete="off"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="form-error">{errors.firstName}</p>
                  ) : null}
                </div>

                <div className="input-block">
                  <label htmlFor="name" className="input-label">
                    Last Name
                  </label>
                  <input
                    type="name"
                    autoComplete="off"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName ? (
                    <p className="form-error">{errors.lastName}</p>
                  ) : null}
                </div>

                <div className="input-block">
                  <label htmlFor="name" className="input-label">
                    Mobile Number
                  </label>
                  <input
                    type="name"
                    autoComplete="off"
                    name="mobile_number"
                    id="mobile_number"
                    placeholder="Mobile Number"
                    value={values.mobile_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.mobile_number && touched.mobile_number ? (
                    <p className="form-error">{errors.mobile_number}</p>
                  ) : null}
                </div>

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
                <div className="input-block">
                  <label htmlFor="confirm_password" className="input-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="form-error">{errors.confirm_password}</p>
                  ) : null}
                </div>
                <div className="modal-buttons">
                  <button className="input-button" type="submit">
                    Registration
                  </button>
                </div>
                {signUpError && <div className="form-error">{signUpError}</div>}
              </form>
              <p className="sign-up">
                Already have an account? <a href="/login">Sign In now</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

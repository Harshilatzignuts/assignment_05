import React, { useState } from "react";
import { ChangePasswordSchema } from "../../schemas";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

import bcrypt from "bcryptjs";
const initialValues = {
  currPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const currUser = useSelector((state) => state.user.currentUser);
  const [changePasswordError, setChangePasswordError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ChangePasswordSchema,
      onSubmit: (values, { setSubmitting, setFieldError }) => {
        const { currPassword, newPassword } = values;
        const passwordMatch = bcrypt.compareSync(
          currPassword,
          currUser.password
        );
        console.log(passwordMatch);
        const newPaswordMatch = bcrypt.compareSync(
          newPassword,
          currUser.password
        );

        console.log(newPaswordMatch);
        const user = currUser;
        // console.log(user);

        // console.log(currPassword);

        console.log(newPassword);

        if (passwordMatch) {
          if (newPaswordMatch == false) {
            dispatch(
              updateUserPassword({ ...users, id: user.id, newPassword })
            );
            console.log(newPassword);
            Navigate("/products");
            console.log("Password Changed Successfully! ");
          } else {
            setChangePasswordError(
              "New Password cannot be same as Current Password"
            );
          }
        } else {
          setChangePasswordError("Current Password is Wrong");
        }
      },
    });

  return (
    <div>
      <Header />
      <div className="container">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">Change Password</h1>
              <p className="modal-desc"></p>
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label htmlFor="email" className="input-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="currPassword"
                    id="currPassword"
                    placeholder="Currrent Password"
                    value={values.currPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.currPassword && touched.currPassword ? (
                    <p className="form-error">{errors.currPassword}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="password" className="input-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <p className="form-error">{errors.newPassword}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label htmlFor="confirm_password" className="input-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="form-error">{errors.confirmPassword}</p>
                  ) : null}
                </div>
                {changePasswordError && (
                  <p className="form-error">{changePasswordError}</p>
                )}
                <div className="modal-buttons">
                  <button className="input-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

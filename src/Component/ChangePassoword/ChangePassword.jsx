import React, { useState } from "react";
import { ChangePasswordSchema } from "../../schemas";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
const initialValues = {
  currPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const currUser = useSelector((state) => state.user.currentUser);
  const [changePasswordError, setChangePasswordError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ChangePasswordSchema,
      onSubmit: (values, { setSubmitting, setFieldError }) => {
        const { currentPassword, newPassword } = values;
        const user = currUser;
        // console.log(user.password);

        // console.log(values.currPassword);

        // console.log(newPassword);
        if (values.currPassword !== user.password) {
          setChangePasswordError("Current password is incorrect");
          setSubmitting(false);
          return;
        }

        // Dispatch the updateUserPassword action
        dispatch(updateUserPassword({ id: user.id, newPassword }));
        console.log("password change succsessfully");
        Navigate("../products");
        // Reset the form
        resetForm();
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

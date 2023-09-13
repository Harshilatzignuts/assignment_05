import React, { useState } from "react";
import { EditProfileSchema } from "../../schemas";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../Redux/AuthSlice";
import Header from "../Header/Header";

const EditProfile = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [updateProfileError, setUpdateProfileError] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);

  const onSubmit = (values) => {
    const user = users.find((user) => user.email === values.email);
    if (user) {
      setUpdateProfileError("Email Already Taken");
      setSubmitting(false);
      return;
    } else {
      dispatch(updateUserProfile({ id: currentUser.id, ...values }));
      console.log(values);
      setUpdateProfileError("something missing");
      Navigate("/products");
      console.log("User Details Updated Successfully!");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">Edit Profile</h1>
              <p className="modal-desc"></p>
              <Formik
                initialValues={{ ...currentUser }}
                validationSchema={EditProfileSchema}
                onSubmit={onSubmit}
              >
                {({ touched, errors }) => (
                  <Form>
                    <div className="input-block">
                      <label htmlFor="name" className="input-label">
                        First Name
                      </label>
                      <Field
                        type="name"
                        autoComplete="off"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                      />
                      {errors.firstName && touched.firstName ? (
                        <p className="form-error">{errors.firstName}</p>
                      ) : null}
                    </div>

                    <div className="input-block">
                      <label htmlFor="name" className="input-label">
                        Last Name
                      </label>
                      <Field
                        type="name"
                        autoComplete="off"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                      />
                      {errors.lastName && touched.lastName ? (
                        <p className="form-error">{errors.lastName}</p>
                      ) : null}
                    </div>

                    <div className="input-block">
                      <label htmlFor="email" className="input-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        autoComplete="off"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      {errors.email && touched.email ? (
                        <p className="form-error">{errors.email}</p>
                      ) : null}
                    </div>

                    <div className="input-block">
                      <label htmlFor="name" className="input-label">
                        Mobile Number
                      </label>
                      <Field
                        type="name"
                        autoComplete="off"
                        name="mobile_number"
                        id="mobile_number"
                        placeholder="Mobile Number"
                      />
                      {errors.mobile_number && touched.mobile_number ? (
                        <p className="form-error">{errors.mobile_number}</p>
                      ) : null}
                    </div>

                    {updateProfileError && (
                      <div className="form-error">{updateProfileError}</div>
                    )}
                    <div className="modal-buttons">
                      <button className="input-button" type="submit">
                        Save
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

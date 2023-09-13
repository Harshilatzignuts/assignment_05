import * as yup from "yup";

export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),
  lastName: yup.string().min(2).max(25).required("Please enter your last name"),
  email: yup.string().email().required("Please enter your email"),
  mobile_number: yup
    .string()
    .max(10)
    .required("Please Enter your Mobile number")
    .matches(/^([0|\+[0-9]{1,5})?([0-9]{10})$/, "Must Contain 10 numbers"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "password must match"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});

export const ChangePasswordSchema = yup.object().shape({
  currPassword: yup
    .string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(32, "Password is too long - should be 32 chars maximum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  newPassword: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(32, "Password is too long - should be 32 chars maximum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export const EditProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  mobile_number: yup
    .string()
    .min(10, "Invalid mobile number")
    .max(10, "Invalid mobile number")
    .required("Required"),
});

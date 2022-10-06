import * as Yup from "yup";

export const loginValidationScheme = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required."),
  password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters.")
})

export const loginInitialValues = {
  email: "",
  password: ""
};

export type LoginValuesType = typeof loginInitialValues;

export const registerValidationScheme = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Invalid email address").required("Email is required."),
  password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters."),
  confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("password"), null], "Passwords must match.")
})

export const registerIntialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};
export type RegisterValuesType = typeof registerIntialValues;
import React from "react";
import Link from "next/link"

// Yup and formik
import * as Yup from "yup";
import { Formik, Form } from "formik";

// MUI imports
import GoogleIcon from '@mui/icons-material/Google';
import { Button, ButtonGroup } from "@mui/material";

// Local components
import TextField from "./TextField";

type Props = {
  isRegister?: boolean;
}

const Login = ({ isRegister }: Props) => {
  const loginValidationScheme = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters.")
  })

  const loginInitialValues = {
    email: "",
    password: ""
  };

  const registerValidationScheme = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters."),
    confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("password"), null], "Passwords must match.")
  })

  const registerIntialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  return (
    <div className="w-full h-full bg-slate-800 rounded-lg shadow-2xl">
      <div className="text-white text-4xl flex justify-center py-5">
        <h1>{isRegister ? "Sign Up" : "Sign In"}</h1>
      </div>

      <div className="flex justify-center mb-5 w-full">
        <div className="w-[80%]">
          <Button style={{ backgroundColor: "#f56565", width: "100%" }} variant="contained" startIcon={<GoogleIcon />}>{isRegister ? "Or Sign Up With Google" : "Sign In With Google"}</Button>
        </div>
      </div>

      <Formik
        initialValues={isRegister ? registerIntialValues : loginInitialValues}
        validationSchema={isRegister ? registerValidationScheme : loginValidationScheme}

        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitting form with values: ", values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={`flex flex-col items-center gap-1 ${isRegister && "gap-4"}`}>
          <div className="flex gap-4 flex-col w-full items-center">
            {isRegister ? (
              <>
                <TextField className="w-[80%]" name="name" label="Name" type="text" />
                <TextField className="w-[80%]" name="email" label="Email" type="email" />
                <TextField className="w-[80%]" name="password" label="Password" type="password" />
                <TextField className="w-[80%]" name="confirmPassword" label="Confirm Password" type="password" />
              </>
            ) : (
              <>
                <TextField className="w-[80%]" name="email" label="Email" type="email" />
                <TextField className="w-[80%]" name="password" label="Password" type="password" />
              </>
            )}
          </div>

          <div className="w-full flex flex-col items-center gap-2">

            {!isRegister && (
              <Button variant="text" style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}>Forgot your password?</Button>
            )}

            <ButtonGroup className="w-[80%] flex gap-2" variant="contained">
              <Link href={isRegister ? "/login" : "/register"}>
                <Button style={{ backgroundColor: "#4F46E5" }} className="w-full" variant="contained">{isRegister ? "Or Sign In" : "No Account?"}</Button>
              </Link>
              <Button style={{ backgroundColor: "#4F46E5" }} className="w-full" type="submit" variant="contained">{isRegister ? "Sign Up" : "Sign In"}</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export { Login };
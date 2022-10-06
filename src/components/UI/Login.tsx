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
import { signIn } from "next-auth/react";

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
  type RegisterValuesType = typeof registerIntialValues;

  const signInGoogle = () => {
    signIn("google", { callbackUrl: "/" })
  }


  return (
    <div className="w-full h-full bg-slate-800 rounded-lg shadow-2xl">
      <div className="text-white text-4xl flex justify-center py-5 md:text-5xl md:mb-3">
        <h1>{isRegister ? "Sign Up" : "Sign In"}</h1>
      </div>

      <div className="flex justify-center mb-5 w-full">
        <div className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
          <Button onClick={() => signInGoogle()} style={{ backgroundColor: "#f56565", width: "100%" }} variant="contained" startIcon={<GoogleIcon />}>{isRegister ? "Or Sign Up With Google" : "Sign In With Google"}</Button>
        </div>
      </div>

      <Formik
        initialValues={isRegister ? registerIntialValues : loginInitialValues}
        validationSchema={isRegister ? registerValidationScheme : loginValidationScheme}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (!isRegister) {
              signIn("credentials", { redirect: true, email: values.email, password: values.password })
            } else {
              const registerValues = values as RegisterValuesType;
              console.log(registerValues);
            }

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={`flex flex-col items-center gap-1 ${isRegister && "gap-4"}`}>
          <div className="flex w-full justify-center">
            {isRegister ? (
              <div className="flex flex-col gap-4 w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
                <TextField className="w-full" name="name" label="Name" type="text" />
                <TextField className="w-full" name="email" label="Email" type="email" />
                <TextField className="w-full" name="password" label="Password" type="password" />
                <TextField className="w-full" name="confirmPassword" label="Confirm Password" type="password" />
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
                <TextField className="w-full" name="email" label="Email" type="email" />
                <TextField className="w-full" name="password" label="Password" type="password" />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-center gap-2">

            {!isRegister && (
              <Button variant="text" style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}>Forgot your password?</Button>
            )}

            <ButtonGroup className="w-[80%] flex gap-2 md:w-[50%] lg:w-[35%] xl:w-[25%]" variant="contained">
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
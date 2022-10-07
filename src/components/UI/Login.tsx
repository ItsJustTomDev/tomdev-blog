import React, { useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link"
import axios, { AxiosError } from "axios";

// Yup and formik
import * as Yup from "yup";
import { Formik, Form } from "formik";

// MUI imports
import GoogleIcon from '@mui/icons-material/Google';
import { Button, ButtonGroup, Alert } from "@mui/material";

// Local components
import TextField from "./TextField";
import { signIn } from "next-auth/react";
import { loginInitialValues, loginValidationScheme, LoginValuesType, registerIntialValues, registerValidationScheme, RegisterValuesType } from "schema/LoginSchema";

type Props = {
  isRegister?: boolean;
}

const Login = ({ isRegister }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInGoogle = async () => {
    const res = await signIn("google", { redirect: false, });

    if (res?.ok) return router.push("/");
  }

  const registerNewUser = async (registerValues: RegisterValuesType) => {
    try {
      const res = await axios.post("/api/auth/register", registerValues);

      if (res.status === 201) {
        const loginRes = await signIn("credentials", { redirect: false, email: registerValues.email, password: registerValues.password })

        if (loginRes?.ok) return router.push("/");
      }


    } catch (error: unknown) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        setError("This user already exists.")
      } else if (err.response?.status === 500) {
        setError("Something went wrong, please try again later.")
      }
    }
  }

  const signInWithAccount = async (values: LoginValuesType) => {
    const res = await signIn("credentials", { redirect: false, email: values.email, password: values.password })

    if (res?.error === "invalid credentials") {
      setError("Sorry your password does not match our records.")
    } else if (res?.error === "User not found") {
      setError("Sorry we could not find a user with that email.")
    }

    if (res?.ok) {
      router.push("/");
    }
  }

  return (
    <div className="w-full h-full bg-slate-800 rounded-lg shadow-2xl">
      <div className="text-white text-4xl flex justify-center py-5 md:text-5xl md:mb-3">
        <h1>{isRegister ? "Sign Up" : "Sign In"}</h1>
      </div>

      {error && (
        <div className="w-full flex justify-center mb-5">
          <Alert className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]" severity="error">{error}</Alert>
        </div>
      )}

      <div className="flex justify-center mb-5 w-full">
        <div className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
          <Button onClick={() => signInGoogle()} style={{ backgroundColor: "#f56565", width: "100%" }} variant="contained" startIcon={<GoogleIcon />}>{isRegister ? "Or Sign Up With Google" : "Sign In With Google"}</Button>
        </div>
      </div>

      <Formik
        initialValues={isRegister ? registerIntialValues : loginInitialValues}
        validationSchema={isRegister ? registerValidationScheme : loginValidationScheme}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (!isRegister) {
              signInWithAccount(values);
            } else {
              const registerValues = values as RegisterValuesType;
              registerNewUser(registerValues);
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
              <Link href={isRegister ? "/auth/login" : "/auth/register"}>
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
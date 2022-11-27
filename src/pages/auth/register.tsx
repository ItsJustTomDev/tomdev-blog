import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Import local components & Layout
import PageLayout from "@components/layout/page-layout";
import GoogleIcon from '@mui/icons-material/Google';
import TextField from "@components/ui/text-field";

import * as Yup from "yup";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import axios, { AxiosError } from "axios";


export const registerValidationScheme = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters."),
    confirmPassword: Yup.string().required("Confirm password is required.").oneOf([Yup.ref("password"), null], "Passwords must match.")
}).nullable();

export const registerIntialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
};
export type RegisterValues = typeof registerIntialValues;

const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const register = async (values: RegisterValues) => {
        try {
            const res = await axios.post("/api/auth/register", values);

            if (res.status === 201) {
                const loginRes = await signIn("credentials", { redirect: false, email: values.email, password: values.password })

                if (loginRes?.ok)
                    return router.push("/");
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

    const signUpWithGoogle = async () => {
        const res = await signIn("google", { redirect: false, });

        if (res?.ok)
            return router.push("/");
    }

    return (
        <PageLayout className="flex justify-center py-8 px-4">
            <div className="w-full h-full rounded-lg shadow-2xl">
                <div className="text-slate-800 text-4xl flex justify-center py-5 md:text-5xl md:mb-3">
                    <h1>Sign Up</h1>
                </div>

                {error && (
                    <div className="w-full flex justify-center mb-5">
                        <Alert className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]" severity="error">{error}</Alert>
                    </div>
                )}

                <div className="flex justify-center mb-5 w-full">
                    <div className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
                        <Button onClick={() => signUpWithGoogle()} style={{ backgroundColor: "#f56565", width: "100%" }} variant="contained" startIcon={<GoogleIcon />}>Or Sign Up With Google</Button>
                    </div>
                </div>

                <Formik
                    initialValues={registerIntialValues}
                    validationSchema={registerValidationScheme}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => register(values)}
                >
                    <Form className="flex flex-col items-center gap-4">
                        <div className="flex w-full justify-center">
                            <div className="flex flex-col gap-4 w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
                                <TextField className="w-full" name="name" label="Name" type="text" />
                                <TextField className="w-full" name="email" label="Email" type="email" />
                                <TextField className="w-full" name="password" label="Password" type="password" />
                                <TextField className="w-full" name="confirmPassword" label="Confirm Password" type="password" />
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-center gap-2">
                            <ButtonGroup className="w-[80%] flex gap-2 md:w-[50%] lg:w-[35%] xl:w-[25%]" variant="contained">
                                <Link href="/auth/login">
                                    <Button style={{ backgroundColor: "#4F46E5" }} className="w-full" variant="contained">Or Sign In</Button>
                                </Link>
                                <Button style={{ backgroundColor: "#4F46E5" }} className="w-full" type="submit" variant="contained">Sign Up</Button>
                            </ButtonGroup>
                        </div>
                    </Form>
                </Formik>
            </div>
        </PageLayout>
    )
}

export default Register; 
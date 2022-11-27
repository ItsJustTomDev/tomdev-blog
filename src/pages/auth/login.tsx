import React, { useState } from "react"
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

// Import our page layout & components
import PageLayout from "@components/layout/page-layout";
import GoogleIcon from '@mui/icons-material/Google';
import TextField from "@components/ui/text-field";
import * as Yup from "yup";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";

export const loginValidationScheme = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters.")
});

export type LoginValues = Yup.InferType<typeof loginValidationScheme>;

const Login = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const loginInitialValues = {
        email: "",
        password: ""
    }

    const signInGoogle = async () => {
        const res = await signIn("google", { redirect: false, });

        if (res?.ok)
            return router.push("/");
    }

    const login = async (values: LoginValues) => {
        const res = await signIn("credentials", { redirect: false, email: values.email, password: values.password })

        if (res?.error === "invalid credentials") {
            setError("Sorry your password does not match our records.")
        } else if (res?.error === "User not found") {
            setError("Sorry we could not find a user with that email.")
        }

        if (res?.ok)
            router.push("/");

    }

    return (
        <PageLayout className="flex justify-center py-8 px-4">
            <div className="w-full h-full rounded-lg shadow-2xl">
                <div className="text-slate-800 text-4xl flex justify-center py-5 md:text-5xl md:mb-3">
                    <h1>Sign In</h1>
                </div>

                {error && (
                    <div className="w-full flex justify-center mb-5">
                        <Alert className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]" severity="error">{error}</Alert>
                    </div>
                )}

                <div className="flex justify-center mb-5 w-full">
                    <div className="w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
                        <Button onClick={() => signInGoogle()} style={{ backgroundColor: "#f56565", width: "100%" }} variant="contained" startIcon={<GoogleIcon />}>Sign In With Google</Button>
                    </div>
                </div>

                <Formik
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationScheme}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => login(values)}
                >
                    <Form className="flex flex-col items-center gap-1">
                        <div className="flex w-full justify-center">
                            <div className="flex flex-col gap-4 w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%]">
                                <TextField className="w-full" name="email" label="Email" type="email" />
                                <TextField className="w-full" name="password" label="Password" type="password" />
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-center gap-2">

                            <Button variant="text" style={{ color: "rgb(30 41 59)", textDecoration: "underline", cursor: "pointer" }}>Forgot your password?</Button>


                            <ButtonGroup className="w-[80%] flex gap-2 md:w-[50%] lg:w-[35%] xl:w-[25%]" variant="contained">
                                <Link href="/auth/register">
                                    <Button style={{ backgroundColor: "#4F46E5" }} className="w-full" variant="contained">No Account?</Button>
                                </Link>
                                <Button style={{ backgroundColor: "#4F46E5" }} className="w-full" type="submit" variant="contained">Sign In</Button>
                            </ButtonGroup>
                        </div>
                    </Form>
                </Formik>
            </div>
        </PageLayout>
    )
}

export default Login;
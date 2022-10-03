import React from "react"
import type { NextPage } from "next"

// Formik & Yup
import { Formik, Form } from "formik"
import * as Yup from "yup"

// Import our page layout & components
import PageLayout from "@components/Layout/PageLayout";
import TextField from "@components/UI/TextField"
import { Button } from "@mui/material"

const Login: NextPage = () => {
  const validationScheme = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string().required("Password is required.").min(6, "Password must be at least 8 characters.")
  })

  return (
    <PageLayout className="flex justify-center py-8 px-4">
      <div className="w-full h-full bg-slate-800 rounded-lg shadow-2xl">
        <div className="text-white text-4xl flex justify-center py-5">
          <h1>Login</h1>
        </div>

        <div>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={validationScheme}

            onSubmit={(values, { setSubmitting }) => {
              console.log("Submitting form with values: ", values);
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className="flex flex-col items-center gap-5">
              <div className="flex gap-4 flex-col w-full items-center">
                <TextField className="w-[80%]" name="email" label="Email" type="email" />
                <TextField className="w-[80%]" name="password" label="Password" type="password" />
              </div>

              <Button style={{ backgroundColor: "#4F46E5" }} type="submit" className="w-[50%]" variant="contained">Sign In</Button>
            </Form>

          </Formik>
        </div>
      </div>
    </PageLayout>
  )
}

export default Login;
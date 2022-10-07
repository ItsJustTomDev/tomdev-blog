import React from "react";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { newPostInitialValues, newPostValidationScheme } from "schema/NewPostSchema";

const NewPost = () => {
  return (
    <>
      <div>
        <img className="h-44 lg:h-56 w-full" src="/img/new.png" />
      </div>

      <Formik
        initialValues={newPostInitialValues}
        validationSchema={newPostValidationScheme}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="bg-slate-200 p-3 flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4 flex-1 lg:flex-grow-0">
            <TextField name="title" filled isPostTitle type="text" placeholder="Title" label="Name your post!" />
            <TextField name="about" filled isPostAbout placeholder="About" label="What is this post about?" />
            <TextField name="content" filled isPostContent placeholder="Your text here..." label="Write your post with markup!" />
          </div>

          <div className="flex justify-center">
            <div className="w-[80%] md:w-[50%] lg:w-[30%]">
              <Button type="submit" style={{ backgroundColor: "#4F46E5" }} fullWidth variant="contained">
                <span className="text-xl">Post!</span>
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default NewPost;
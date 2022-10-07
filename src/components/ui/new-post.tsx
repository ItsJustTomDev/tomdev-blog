import React, { useState } from "react";
import { useRouter } from "next/router";

import TextField from "./text-field";
import axios, { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { Alert, Button, Slide } from "@mui/material";
import { UserSession } from "types/user";
import * as Yup from "yup";

type Props = {
    session: UserSession;
}

export const newPostValidationScheme = Yup.object({
    title: Yup.string().required("Oopsie, you need to give your post a title!").min(3, "Your title is too short!"),
    about: Yup.string().required("Whoops, looks like your forgot to tell us what your post is about!").min(30, "Thats too short!"),
    content: Yup.string().required("Oops, What is a blog post without its content?").min(50, "Thats really short for a blog post..."),
    author: Yup.string().required("Sorry but we need to know who wrote this blog post!").min(3, "Thats too short!"),
}).nullable();

export type NewPostValues = Yup.InferType<typeof newPostValidationScheme>;

const NewPost = ({ session }: Props) => {
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // We are 100% sure we have a session, due to the fact that we are using the securePage HOC, that returns the session.
    // Normally you'd have a useEffect where it checks if its defined, is so set the state.
    // But in this case we are are fetching the session from the server, before the component is rendered.
    const { user } = session;
    const newPostInitialValues = {
        title: "",
        about: "",
        content: "",
        author: user.email,
    };

    const createPost = async (values: typeof newPostInitialValues) => {
        try {
            const res = await axios.post("/api/posts", values);
            if (res.status === 201) {
                setSuccess(!success)

                // TODO:
                // - Replace this with blog post page.
                setTimeout(() => {
                    router.push("/");
                }, 2000)
            }
        } catch (error) {
            const err = error as AxiosError;

            console.log(err)
        }
    }

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
                onSubmit={(values) => createPost(values)}
            >
                <>
                    {success && (
                        <div className="p-3 bg-slate-200">
                            <Slide direction="left" in={success}>
                                <Alert style={{ backgroundColor: "#A7D8A7" }} severity="success">Posted your post successfully - redirecting you back to the home page</Alert>
                            </Slide>
                        </div>
                    )}

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
                </>
            </Formik>
        </>
    )
}

export default NewPost;
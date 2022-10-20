import React from "react";
import { useRouter } from "next/router";
import { securePage } from "auth/secure-page";

import PageLayout from "@components/layout/page-layout";
import type { PageProps } from "types/page-props";

import { Form, Formik } from "formik";

import axios, { AxiosError } from "axios";
import * as Yup from "yup";
import TextField from "@components/ui/text-field";
import { Button } from "@mui/material";
import { UserSession } from "types/user";

export const newPostValidationScheme = Yup.object({
    title: Yup.string().required("Oopsie, you need to give your post a title!").min(3, "Your title is too short!"),
    about: Yup.string().required("Whoops, looks like your forgot to tell us what your post is about!").min(30, "Thats too short!"),
    content: Yup.string().required("Oops, What is a blog post without its content?").min(50, "Thats really short for a blog post..."),
    author: Yup.string().required("Sorry but we need to know who wrote this blog post!").min(3, "Thats too short!"),
}).nullable();

const New = ({ isAuthorized, userSession }: PageProps) => {
    const router = useRouter();

    // We are 100% sure we have a session, due to the fact that we are using the securePage HOC, that returns the session.
    // Normally you'd have a useEffect where it checks if its defined, is so set the state.
    // But in this case we are are fetching the session from the server, before the component is rendered.

    const { user } = userSession as UserSession;
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
                router.push("/");
            }
        } catch (error) {
            const err = error as AxiosError;

            console.log(err)
        }
    }

    return (
        <PageLayout className="flex flex-col" isAuthorized={isAuthorized}>
            <div>
                <div className="h-44 lg:h-56 w-full bg-gradient-to-b from-indigo-600 to-indigo-800 flex justify-center items-center">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Create your new blog post!</h1>
                </div>
            </div>

            <Formik
                initialValues={newPostInitialValues}
                validationSchema={newPostValidationScheme}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => createPost(values)}
            >
                <Form className="p-3 flex flex-col gap-4 flex-1 items-center">
                    <div className="flex flex-col gap-4 flex-1 lg:flex-grow-0 w-[80%] md:w-[50%] lg:w-[40%]">
                        <TextField name="title" type="text" placeholder="Title" label="Name your post!" />
                        <TextField name="about" minRows={5} multiline placeholder="About" label="What is this post about?" />
                        <TextField name="content" minRows={10} multiline placeholder="Your text here..." label="Write your post with markup!" />
                    </div>

                    <div className="flex justify-center w-full">
                        <div className="w-[70%] md:w-[50%] lg:w-[25%]">
                            <Button type="submit" style={{ backgroundColor: "#4F46E5" }} fullWidth variant="contained">
                                <span className="text-xl">Post!</span>
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </PageLayout >
    )
}

export const getServerSideProps = securePage();
export default New;
import React from "react";
import { GetServerSideProps } from "next"
import { Post } from "types/post";
import axios, { AxiosError } from "axios";
import PageLayout from "@components/layout/page-layout";


const PostPage = () => {
    return (
        <PageLayout>

        </PageLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;

    try {
        const res = await axios.get<Post>("http://localhost:3000/api/posts", {
            headers: context.req.headers,
            params: {
                slug
            }
        });

        if (res.data)
            return {
                props: {
                    post: res.data
                }
            }
    } catch (error) {
        const err = error as AxiosError;

        if (err.response?.status === 404)
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                },
                props: {}
            }
    }

    return {
        props: {}
    }
}
export default PostPage;
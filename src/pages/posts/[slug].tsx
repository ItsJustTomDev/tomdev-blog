import React from "react";
import { GetServerSideProps } from "next"
import { Post } from "types/post";
import axios, { AxiosError } from "axios";
import PageLayout from "@components/layout/page-layout";
import ReactMarkdown from "react-markdown";

interface Props extends Post {
    post: {
        data: Post
    }
}

const PostPage = ({ post }: Props) => {
    return (
        <PageLayout className="flex items-center flex-col font-sans gap-5">
            <div className="font-sans flex flex-col items-center gap-2 mt-5">
                <h1 className="text-5xl">{post.data.title}</h1>
                <p>Author: {post.data.author}</p>
            </div>

            <div className="break-words w-full flex justify-center">
                <ReactMarkdown className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
                    {post.data.content}
                </ReactMarkdown>
            </div >
        </PageLayout >
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
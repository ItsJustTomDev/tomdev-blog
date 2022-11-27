import React from "react";
import type { PageProps } from "types/page-props";

import PageLayout from "@components/layout/page-layout";
import PostCard from "@components/ui/post-card";
import { securePage } from "auth/secure-page";
import { GetServerSideProps } from "next";
import { Post } from "types/post";
import axios, { AxiosError } from "axios";

const Home = ({ isAuthorized, post }: PageProps) => {
    return (
        <PageLayout className="flex flex-col items-center pt-5" isAuthorized={isAuthorized} >
            <PostCard post={post} />
        </PageLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    securePage();

    try {
        const res = await axios.get<Post>("http://localhost:3000/api/posts");

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
export default Home;

import React from "react";
import type { PageProps } from "types/page-props";

import PageLayout from "@components/layout/page-layout";
import PostCard from "@components/ui/post-card";
import { securePage } from "auth/secure-page";

const Home = ({ isAuthorized }: PageProps) => {
    return (
        <PageLayout className="flex flex-col items-center pt-5" isAuthorized={isAuthorized} >
            <PostCard />
        </PageLayout>
    )
}

export const getServerSideProps = securePage();
export default Home;

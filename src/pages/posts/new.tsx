import React from "react";
import { securePage } from "auth/secure-page";

import PageLayout from "@components/layout/page-layout";
import NewPost from "@components/ui/new-post";

import type { PageProps } from "types/page-props";

const New = ({ isAuthorized, userSession }: PageProps) => {

    return (
        <PageLayout className="flex flex-col" isAuthorized={isAuthorized}>
            <NewPost session={userSession} />
        </PageLayout>
    )
}

export const getServerSideProps = securePage();
export default New;
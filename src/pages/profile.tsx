import React from "react";
import PageLayout from "@components/layout/page-layout";
import { securePage } from "auth/secure-page";

import type { PageProps } from "types/page-props";

const Profile = ({ isAuthorized }: PageProps) => {
    return (
        <PageLayout isAuthorized={isAuthorized}>

        </PageLayout>
    )
}

export const getServerSideProps = securePage();
export default Profile;
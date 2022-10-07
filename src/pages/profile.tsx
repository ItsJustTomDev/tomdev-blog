import React from "react";
import PageLayout from "@components/Layout/PageLayout";
import { securePage } from "authorization/securePage";

import type { PageProps } from "types/PageProps";

const Profile = ({ isAuthorized }: PageProps) => {
  return (
    <PageLayout isAuthorized={isAuthorized}>

    </PageLayout>
  )
}

export const getServerSideProps = securePage();
export default Profile;
import React from "react";
import PageLayout from "@components/Layout/PageLayout";
import { isAuthenticated } from "util/isAuthenticated";

import type { PageProps } from "types/PageProps";

const Profile = ({ isAuthenticated }: PageProps) => {
  return (
    <PageLayout isAuthenticated={isAuthenticated}>

    </PageLayout>
  )
}

export const getServerSideProps = isAuthenticated();
export default Profile;
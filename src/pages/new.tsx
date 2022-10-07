import React from "react";
import type { PageProps } from "types/PageProps";

import PageLayout from "@components/Layout/PageLayout";
import NewPost from "@components/UI/NewPost";
import { securePage } from "authorization/securePage";

const New = ({ isAuthorized }: PageProps) => {

  return (
    <PageLayout className="flex flex-col" isAuthorized={isAuthorized}>
      <NewPost />
    </PageLayout>
  )
}

export const getServerSideProps = securePage();
export default New;
import React from "react";

import { useSession } from "next-auth/react";
import PageLayout from "@components/Layout/PageLayout";
import PostCard from "@components/UI/PostCard";
import { securePage } from "authorization/securePage";
import type { PageProps } from "types/PageProps";


const Home = ({ isAuthorized }: PageProps) => {
  const session = useSession();

  return (
    <PageLayout className="flex flex-col items-center pt-5" isAuthorized={isAuthorized} >
      <PostCard />
    </PageLayout>
  )
}

export const getServerSideProps = securePage();
export default Home;

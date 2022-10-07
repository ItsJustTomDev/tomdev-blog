import React from "react";

import { useSession } from "next-auth/react";
import PageLayout from "@components/Layout/PageLayout";
import PostCard from "@components/UI/PostCard";
import { isAuthenticated } from "util/isAuthenticated";
import type { PageProps } from "types/PageProps";


const Home = ({ isAuthenticated }: PageProps) => {
  const session = useSession();

  return (
    <PageLayout className="flex flex-col items-center pt-5" isAuthenticated={isAuthenticated} >
      <PostCard />
    </PageLayout>
  )
}

export const getServerSideProps = isAuthenticated();
export default Home;

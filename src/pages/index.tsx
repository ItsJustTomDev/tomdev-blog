import React from "react";

import { getSession, GetSessionParams, useSession } from "next-auth/react";
import PageLayout from "@components/Layout/PageLayout";
import PostCard from "@components/UI/PostCard";

type Props = {
  isAuthenticated: boolean;
}

const Home = ({ isAuthenticated }: Props) => {
  const session = useSession();

  return (
    <PageLayout className="flex flex-col items-center pt-5" isAuthenticated={isAuthenticated} >
      <PostCard />
    </PageLayout>
  )
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        isAuthenticated: true
      }
    }
  }

  return {
    props: {
      isAuthenticated: false
    }
  }

}

export default Home;

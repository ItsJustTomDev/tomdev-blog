import React from "react";

import { getSession, GetSessionParams, useSession } from "next-auth/react";
import PageLayout from "@components/Layout/PageLayout";

type Props = {
  isAuthenticated: boolean;
}

const Home = ({ isAuthenticated }: Props) => {
  const session = useSession();

  return (
    <PageLayout isAuthenticated={isAuthenticated} >
      <h1>{session.data?.user?.name}</h1>
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

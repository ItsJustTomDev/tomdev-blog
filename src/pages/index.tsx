import React from "react";

import { getSession, GetSessionParams, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material"
import PageLayout from "@components/Layout/PageLayout";


type Props = {
  isAuthenticated: boolean;
}

const Home = ({ isAuthenticated }: Props) => {
  const session = useSession();

  return (
    <PageLayout isAuthenticated={isAuthenticated} >

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

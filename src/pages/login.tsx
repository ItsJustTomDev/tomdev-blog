import React from "react"
import type { NextPage } from "next"

// Import our page layout & components
import PageLayout from "@components/Layout/PageLayout";
import { Login as LoginUI } from "@components/UI/Login";
import { getSession, GetSessionParams } from "next-auth/react";

const Login: NextPage = () => {
  return (
    <PageLayout className="flex justify-center py-8 px-4">
      <LoginUI />
    </PageLayout>
  )
}

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Login;
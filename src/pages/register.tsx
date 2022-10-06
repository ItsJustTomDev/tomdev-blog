import React from "react";
import type { NextPage } from "next"

// Import local components & Layout
import PageLayout from "@components/Layout/PageLayout";
import { Login as RegisterUI } from "@components/UI/Login"
import { getSession, GetSessionParams } from "next-auth/react";

const Register: NextPage = () => {
  return (
    <PageLayout className="flex justify-center py-8 px-4">
      <RegisterUI isRegister />
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

export default Register; 
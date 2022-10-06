import React from "react"
import type { NextPage } from "next"

// Import our page layout & components
import PageLayout from "@components/Layout/PageLayout";
import { Login as LoginUI } from "@components/UI/Login";

const Login: NextPage = () => {
  return (
    <PageLayout className="flex justify-center py-8 px-4">
      <LoginUI />
    </PageLayout>
  )
}

export default Login;
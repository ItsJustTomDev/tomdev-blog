import React from "react";
import type { NextPage } from "next"

// Import local components & Layout
import PageLayout from "@components/Layout/PageLayout";
import { Login as RegisterUI } from "@components/UI/Login"

const Register: NextPage = () => {
  return (
    <PageLayout className="flex justify-center py-8 px-4">
      <RegisterUI isRegister />
    </PageLayout>
  )
}

export default Register; 
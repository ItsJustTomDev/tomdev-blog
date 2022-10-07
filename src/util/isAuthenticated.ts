import { getSession, GetSessionParams } from "next-auth/react";

export const isAuthenticated = () => {
  return async (context: GetSessionParams) => {
    const session = await getSession(context);
    console.log(session)

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
}
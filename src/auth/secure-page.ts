import { getSession, GetSessionParams } from "next-auth/react";

export const securePage = () => {
    return async (context: GetSessionParams) => {
        const session = await getSession(context);

        if (session) {
            return {
                props: {
                    isAuthorized: true,
                    userSession: session
                }
            }
        }

        return {
            props: {
                isAuthorized: false
            }
        }
    }
}
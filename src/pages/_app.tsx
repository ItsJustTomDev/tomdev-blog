import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import type { Session } from "next-auth";

import '../styles/globals.css'
import "tailwindcss/tailwind.css"

interface Props extends AppProps {
    pageProps: {
        session: Session;
        pageProps: AppProps;
    }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp

import React from "react";
import Link from "next/link";
import { List, ListItem } from "@mui/material"
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
    isMobile?: boolean;
    className?: string;
    isLoggedIn: boolean;
}

const NavLinks = ({ isMobile = true, className, isLoggedIn }: Props) => {
    const router = useRouter();

    return (
        <List className={`text-white text-2xl flex ${isMobile ? "flex-col" : "flex-row"} ${className}`}>
            <ListItem>
                <Link href="/">Home</Link>
            </ListItem>
            <ListItem >
                <Link href="/posts/new">New</Link>
            </ListItem>
            {isLoggedIn ? (
                <ListItem>
                    <h1 className="cursor-pointer" onClick={() => signOut()}>Logout</h1>
                </ListItem>
            ) : (
                <ListItem>
                    <h1 className="cursor-pointer" onClick={() => router.push("/auth/login")}>Login</h1>
                </ListItem>
            )}
        </List>
    )
}

export default NavLinks;
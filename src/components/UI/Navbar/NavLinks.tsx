import React from "react";
import Link from "next/link";
import { List, ListItem } from "@mui/material"
import { signOut } from "next-auth/react";


type Props = {
  isMobile?: boolean;
  className?: string;
}

const NavLinks = ({ isMobile = true, className }: Props) => {
  return (
    <List className={`text-white text-2xl flex ${isMobile ? "flex-col" : "flex-row"} ${className}`}>
      <ListItem>
        <Link href="https://google.com">Home</Link>
      </ListItem>
      <ListItem >
        <Link href="https://google.com">New</Link>
      </ListItem>
      <ListItem>
        <Link href="https://google.com">Profile</Link>
      </ListItem>
      <ListItem>
        <h1 className="cursor-pointer" onClick={() => signOut()}>Logout</h1>
      </ListItem>
    </List>
  )
}

export default NavLinks;
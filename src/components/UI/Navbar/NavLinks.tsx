import React from "react";
import Link from "next/link";
import { List, ListItem } from "@mui/material"


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
        <Link href="https://google.com">Posts</Link>
      </ListItem>
      <ListItem>
        <Link href="https://google.com">Profile</Link>
      </ListItem>
    </List>
  )
}

export default NavLinks;
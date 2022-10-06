import React from "react";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material"

const Home = () => {
  const session = useSession();

  return (
    <div>
      <h1>hello world {session.data?.user?.name}</h1>
      <Button variant="contained" onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

export default Home;

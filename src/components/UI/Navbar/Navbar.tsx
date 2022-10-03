import React, { useState } from "react"

// MUI
import { Drawer } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

// Components
import NavLinks from "@components/UI/Navbar/NavLinks";

type Props = {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-indigo-600 h-24 px-6 flex items-center justify-between md:px-12 lg:px-16">
      <h1 className="text-3xl font-bold text-white">TomDev Blog</h1>

      {isLoggedIn && (
        <>
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <MenuIcon fontSize="large" htmlColor="white" />
          </button>

          <Drawer className="md:hidden" onClose={() => setIsOpen(false)} open={isOpen} anchor="top" PaperProps={{
            sx: {
              backgroundColor: "#334155"
            }
          }}>
            <NavLinks isMobile={true} />
          </Drawer>

          <NavLinks className="hidden md:flex" isMobile={false} />
        </>
      )}

    </div>
  )
}

export default Navbar;
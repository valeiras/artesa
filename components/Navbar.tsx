import React from "react";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import LinksDropdown from "./LinksDropdown";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-muted px-8 lg:px-16 xl:px-14 py-4 flex items-center justify-between">
      <LinksDropdown />
      <Image src={logo} alt="logo" />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;

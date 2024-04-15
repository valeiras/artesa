import React from "react";

import LinksDropdown from "./LinksDropdown";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-muted px-4 sm:px-16 lg:px-24 py-4 flex items-center justify-between">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;

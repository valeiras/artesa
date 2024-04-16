"use client";

import React from "react";
import logo from "@/assets/logo.svg";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          return (
            <Button asChild key={link.href} variant={pathname === link.href ? "default" : "link"}>
              <Link
                href={link.href}
                className="grid items-center grid-cols-[1fr,2fr] px-2 xl:px-4 gap-x-2 xl:gap-x-4 text-primary"
              >
                <div className="justify-self-end">{link.icon}</div>
                <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

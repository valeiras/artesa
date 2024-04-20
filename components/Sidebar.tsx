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
    <aside className="py-4 px-8 bg-muted h-full transition-all">
      <Image src={logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname.startsWith(link.href) ? "default" : "link"}
              className="flex justify-start xl:px-4 gap-x-2"
            >
              <Link href={link.href}>
                <div>{link.icon}</div>
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

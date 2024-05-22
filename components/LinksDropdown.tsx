"use client";
import React, { useState } from "react";
import links from "@/lib/links";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { AlignLeft } from "lucide-react";
import Link from "next/link";

const LinksDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="xl:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft />
          <span className="sr-only">Activar enlaces</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 xl:hidden" align="start" sideOffset={25}>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="flex items-center gap-x-2" onClick={() => setIsOpen(false)}>
                {link.icon}
                <span className="capitalize">{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;

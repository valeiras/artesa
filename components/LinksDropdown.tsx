import React from "react";
import links from "@/utils/links";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { AlignLeft } from "lucide-react";

const LinksDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft />
          <span className="sr-only">Activar enlaces</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 lg:hidden" align="start" sideOffset={25}>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href} className="flex items-center gap-x-2">
              {link.icon}
              <span className="capitalize">{link.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;

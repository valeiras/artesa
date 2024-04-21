"use client";

import React, { useRef, useState } from "react";

import links from "@/lib/links";

import SidebarButton from "./SidebarButton";

const Sidebar: React.FC = () => {
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [showLinks, setShowLinks] = useState(true);

  const linkStyles =
    showLinks && linksRef.current ? { width: `${linksRef.current.getBoundingClientRect().width}px` } : { width: `0px` };

  return (
    <aside
      className="py-4 px-2 bg-muted h-full flex flex-row absolute"
      onMouseEnter={() => {
        console.log("Mouse enter");
        console.log(linksRef?.current?.getBoundingClientRect().width);
        setShowLinks(true);
      }}
      onMouseLeave={() => {
        setShowLinks(false);
      }}
    >
      <div className="flex flex-col mt-10 gap-y-4">
        {links.map((link) => {
          return (
            <SidebarButton key={link.href} href={link.href}>
              {link.icon}
            </SidebarButton>
          );
        })}
      </div>
      <div ref={linksContainerRef} style={linkStyles} className="transition-all duration-500 overflow-hidden">
        <div className="flex flex-col mt-10 gap-y-4 w-fit px-2" ref={linksRef}>
          {links.map((link) => {
            return (
              <SidebarButton key={link.href} href={link.href}>
                {link.label}
              </SidebarButton>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

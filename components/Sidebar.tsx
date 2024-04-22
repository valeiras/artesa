"use client";

import React, { useRef, useState } from "react";

import links from "@/lib/links";

const idxLongestLink = links.reduce((currCandidate, currVal, currIdx) => {
  return currVal.href.length > links[currCandidate].href.length ? currIdx : currCandidate;
}, 0);

import SidebarButton from "./SidebarButton";

const Sidebar: React.FC = () => {
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [showLinks, setShowLinks] = useState(true);

  const linkStyles =
    showLinks && linksRef.current ? { width: `${linksRef.current.getBoundingClientRect().width}px` } : { width: `0px` };

  return (
    <aside
      className="hidden xl:min-h-screen overflow-hidden fixed top-0 py-4 px-2 bg-muted h-full xl:flex flex-row"
      onMouseEnter={() => {
        setShowLinks(true);
      }}
      onMouseLeave={() => {
        setShowLinks(false);
      }}
    >
      <div className="flex flex-col mt-32 gap-y-4">
        {links.map((link, idx) => {
          return (
            <SidebarButton href={link.href} key={link.href}>
              {link.icon}
              <div
                ref={idx === idxLongestLink ? linksContainerRef : null}
                style={linkStyles}
                className="transition-all duration-500 overflow-hidden"
              >
                <div className="flex flex-col gap-y-4 w-fit px-2" ref={idx === idxLongestLink ? linksRef : null}>
                  {link.label}
                </div>
              </div>
            </SidebarButton>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { href: string };
const SidebarButton: React.FC<Props> = ({ children, href }) => {
  const pathname = usePathname();
  return (
    <Button
      asChild
      key={href}
      variant={pathname.startsWith(href) ? "default" : "link"}
      className="flex flex-row justify-start xl:px-2"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;

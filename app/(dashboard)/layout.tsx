import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type Props = { children: React.ReactNode };

const layout: React.FC<Props> = async ({ children }) => {
  return (
    <main className="relative">
      <Sidebar />
      <Navbar />
      <div className="py-8 sm:py-14 px-4 sm:px-8 lg:px-14 xl:pl-52 xl:pr-28 2xl:pr-52 w-full mx-auto">{children}</div>
    </main>
  );
};

export default layout;

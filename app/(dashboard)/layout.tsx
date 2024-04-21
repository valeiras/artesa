import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type Props = { children: React.ReactNode };

const layout: React.FC<Props> = async ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className="grid xl:grid-cols-[auto_1fr]">
        <div className="hidden xl:block xl:min-h-screen overflow-hidden">
          <Sidebar />
        </div>
        <div className="py-14 px-4 sm:px-8 lg:px-16 xl:px-16">
          <div className="w-full xl:w-4/5 mx-auto">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default layout;

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
        <div className="py-16 px-4 sm:px-8 lg:px-16 xl:px-32">{children}</div>
      </div>
    </main>
  );
};

export default layout;

import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type Props = { children: React.ReactNode };

const layout: React.FC<Props> = async ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className="grid xl:grid-cols-6">
        <div className="hidden xl:block xl:col-span-1 xl:min-h-screen">
          <Sidebar />
        </div>
        <div className="xl:col-span-5">
          <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
        </div>
      </div>
    </main>
    // <main className="grid xl:grid-cols-6">
    //   {/* first-col hide on small screen */}
    //   <div className="hidden xl:block xl:col-span-1 xl:min-h-screen">
    //     <Sidebar />
    //   </div>
    //   {/* second-col hide dropdown on big screen */}
    //   <div className="xl:col-span-5">
    //     <Navbar />
    //     <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
    //   </div>
    // </main>
  );
};

export default layout;

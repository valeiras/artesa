"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { PropsWithChildren } from "react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;

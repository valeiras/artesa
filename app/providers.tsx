"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
};

export default Providers;

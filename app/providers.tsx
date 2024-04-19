"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 5 * 1000 } } });
  });

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;

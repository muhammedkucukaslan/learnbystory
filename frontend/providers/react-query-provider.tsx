"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const ReactQueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;

"use client";
import { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { client } from "./client";
import { queryClient } from "./queryClient";

const trpcClient = client.createClient({
  links: [
    httpBatchLink({
      url: "/api",
    }),
  ],
});

export const ClientProvider: FC<PropsWithChildren<{}>> = ({ children }) => (
  <client.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </client.Provider>
);

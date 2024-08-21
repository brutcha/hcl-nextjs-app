import { httpBatchLink } from "@trpc/react-query";
import { appRouter } from "@/server/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "/api",
    }),
  ],
});

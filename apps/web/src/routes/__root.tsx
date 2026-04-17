import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import * as React from "react";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { RootComponent } from "@/components/root-component";

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: "TanStack Start is a type-safe, client-first, full-stack React framework.",
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  errorComponent: DefaultCatchBoundary,
  component: RootComponent,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </body>
    </html>
  );
}

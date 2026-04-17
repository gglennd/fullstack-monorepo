import { createMiddleware, createStart } from "@tanstack/react-start";

const apiProxyMiddleware = createMiddleware()
  .server(async ({ request, next }) => {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) {
      return next();
    }

    // eslint-disable-next-line node/prefer-global/process
    const apiUrl = process.env.API_URL || "http://localhost:3000";
    const targetUrl = `${apiUrl}${url.pathname}${url.search}`;
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: Object.fromEntries(request.headers),
      body: request.body,
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  });

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [apiProxyMiddleware],
  };
});

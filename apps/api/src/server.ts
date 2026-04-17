import { createHonoRoute } from "@workspace/hono";

const app = createHonoRoute();

app.get("/", (c) => {
  return c.json({
    message: "Hello, Hono with Nitro!",
  }, 200);
});

app.get("/api/greetings", (c) => {
  return c.json({
    message: "Hello, Hono with Nitro!",
  }, 200);
});

export default app;

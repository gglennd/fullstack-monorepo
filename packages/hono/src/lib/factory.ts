import type { Env } from "hono";

import { Hono } from "hono";

// eslint-disable-next-line ts/explicit-function-return-type
export function createHonoRoute() {
  return new Hono<Env>({ strict: false });
}

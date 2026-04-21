# fullstack-monorepo

A TanStack Start full-stack monorepo with pnpm workspaces.

## Structure

- `apps/web` - TanStack Start web application (port 5173)
- `apps/api` - Hono API server (port 3000)
- `packages/ui` - UI components, hooks, styles
- `packages/hono` - Shared Hono utilities
- `packages/eslint-config` - ESLint configuration

## Tech Stack

- **Frontend**: React 19, TanStack Start, TanStack React Router
- **Backend**: Hono, Vite
- **Monorepo**: pnpm workspaces

## Getting Started

```bash
pnpm install
pnpm dev
```

## Commands

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Lint with auto-fix
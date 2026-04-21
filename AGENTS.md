# AGENTS.md

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start all apps in dev mode (parallel)
pnpm build          # Build all packages/apps
pnpm lint           # Lint all packages
pnpm lint:fix       # Lint with auto-fix
```

## Structure

- `apps/web` - TanStack Start web app (port 5173)
- `apps/api` - Hono API server (port 3000)
- `packages/hono` - Shared Hono utilities
- `packages/ui` - UI components, hooks, styles
- `packages/eslint-config` - ESLint config

## Workspace Packages

- `@workspace/web` - Web app
- `@workspace/api` - API server
- `@workspace/ui` - UI package with exports:
  - `global.css` → `./src/styles/global.css`
  - `lib/*` → `./src/lib/*.ts`
  - `components/*` → `./src/components/ui/*.tsx`
  - `hooks/*` → `./src/hooks/*.ts`
- `@workspace/hono` - Hono shared utilities
- `@workspace/eslint-config` - Shared ESLint config

## Skills

This repo has extensive agent skills in [.agents/skills](.agents/skills/). Run the `skill` tool to load them:

- **TanStack**: start-core, router-core, tanstack-form, react-start, react-router
- **Auth**: better-auth-best-practices, organization-best-practices
- **Database**: drizzle-orm-expert, database-migration, sql-optimization-patterns
- **UI**: shadcn, radix-ui-design-system, tailwind-design-system
- **SEO**: seo-audit, seo-content, seo-technical (40+ SEO skills)

See [SKILLS.md](./SKILLS.md) for the complete list of available skills.

## Design System

Project design is configured in [DESIGN.md](./DESIGN.md). All design tokens (colors, typography, spacing, shadows, radius) are defined there — update that file to change the design system.

## Development

- API runs on port 3000, web on port 5173 (Vite default)
- Web app uses `@workspace/ui` package for components
- API uses `@workspace/hono` for shared utilities

## TypeScript & Style

- All packages are ESM (`"type": "module"`)
- Strict TypeScript: `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `noImplicitOverride`
- Prettier disabled; ESLint handles formatting via `.vscode/settings.json`

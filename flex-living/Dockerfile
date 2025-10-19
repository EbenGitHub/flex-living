# ------------------------------------------------------------------------------
# 1. BUILDER STAGE: Install Dependencies and Build Source Code
# ------------------------------------------------------------------------------
FROM node:22.12-alpine AS builder

# Install pnpm globally (assuming it's your package manager)
RUN npm install -g pnpm

# Set the working directory to the monorepo root
WORKDIR /app

# Copy lockfile and package.json files
# This allows Docker to cache the dependency installation step
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json .

# Copy all package.json files from 'packages' and 'apps' to ensure pnpm installs all dependencies correctly
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/utils/package.json packages/utils/package.json

COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/backend/package.json apps/backend/package.json
COPY apps/storybook/package.json apps/storybook/package.json

# Install dependencies (using --frozen-lockfile for reliable builds)
# The result is all dependencies are available in node_modules
RUN pnpm install --frozen-lockfile --production=false

# Copy all source code
COPY . .

RUN pnpm run build

# ------------------------------------------------------------------------------
# 2. RUNNER STAGE (for NestJS Backend)
# This stage is tiny and only includes the compiled JS and required dependencies
# ------------------------------------------------------------------------------
FROM node:22.12-alpine AS runner_backend

# Set the working directory
WORKDIR /app

COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/apps /app/apps

# 1. Copy only production dependencies from the builder stage
COPY --from=builder /app/node_modules /app/node_modules

# 2. Copy the root package files (to satisfy pnpm workspace structure)
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./

# 3. Copy the compiled NestJS app and all local packages
ARG APP_NAME
COPY --from=builder /app/apps/$APP_NAME/package.json /app/apps/$APP_NAME/
COPY --from=builder /app/apps/$APP_NAME/dist /app/apps/$APP_NAME/dist
COPY --from=builder /app/packages /app/packages

# Install pnpm globally (assuming it's your package manager)
RUN npm install -g pnpm

# Set the entry point to run the compiled application
CMD ["pnpm", "--filter", "backend", "start:prod"]

# ------------------------------------------------------------------------------
# 3. RUNNER STAGE (for Next.js Frontend)
# Next.js requires slightly different assets (like .next folder)
# ------------------------------------------------------------------------------
FROM node:22.12-alpine AS runner_frontend

# Install Next.js runtime dependencies
RUN npm install -g pnpm
WORKDIR /app

COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/apps /app/apps

# Copy files necessary for Next.js to run in standalone mode or Pnpm workspace
# The exact files depend on your Next.js config (standalone or not)
# Assuming a custom server or standard build, you need .next and public files
ARG APP_NAME
COPY --from=builder /app/apps/$APP_NAME/.next /app/apps/$APP_NAME/.next
COPY --from=builder /app/apps/$APP_NAME/public /app/apps/$APP_NAME/public
COPY --from=builder /app/apps/$APP_NAME/node_modules /app/apps/$APP_NAME/node_modules
COPY --from=builder /app/apps/$APP_NAME/next.config.ts /app/apps/$APP_NAME/next.config.ts
COPY --from=builder /app/apps/$APP_NAME/pnpm-lock.yaml /app/apps/$APP_NAME/pnpm-lock.yaml

# Copy the minimum required dependencies and source code
# This is often the trickiest part; pnpm links make this complex, so often copying all node_modules is simpler
COPY --from=builder /app/apps/$APP_NAME/package.json /app/apps/$APP_NAME/

EXPOSE 3000

RUN pnpm --filter frontend install

# Command to run the Next.js production server
CMD ["pnpm", "--filter", "frontend", "start"]
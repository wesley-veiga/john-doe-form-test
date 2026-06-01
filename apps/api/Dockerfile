FROM node:22-alpine AS builder
WORKDIR /workspace

COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

RUN npm ci

COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

RUN npm run build --workspace=packages/shared && \
    npm run build --workspace=apps/api

# ---- runner ----
FROM node:22-alpine AS runner
WORKDIR /workspace

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/packages/shared/package.json ./packages/shared/
COPY --from=builder /workspace/packages/shared/dist ./packages/shared/dist
COPY --from=builder /workspace/apps/api/package.json ./apps/api/
COPY --from=builder /workspace/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /workspace/apps/api/dist ./apps/api/dist
COPY --from=builder /workspace/apps/api/migrations ./apps/api/migrations

WORKDIR /workspace/apps/api

EXPOSE 3000
CMD ["sh", "-c", "npm run migrate && node dist/server.js"]

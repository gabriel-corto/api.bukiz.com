FROM node:20-alpine3.23 AS builder

RUN npm install -g corepack@latest && corepack enable && corepack use pnpm@latest-10

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
RUN pnpm prisma generate

COPY . .
RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start:prod" ]
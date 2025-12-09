FROM node:20-alpine3.23 AS build

RUN npm install --g corepack@latest && corepack enable && corepack use pnpm@latest-10  

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app/

RUN pnpm prisma generate

RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start:prod" ]
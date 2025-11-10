FROM node:20
WORKDIR /app

COPY _crawler/ _crawler/
COPY src/ src/
COPY __test__/ __test__/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json .swcrc vitest.config.mjs eslint.config.mjs dprint.json .env.example .

ENV APP_DOCUMENTATION=https://github.com/rzkytmgr/quran-api
ENV APP_HOST=http://localhost
ENV APP_PORT=3001

RUN node -v && \
    npm install -g pnpm && \
    pnpm -v

RUN pnpm install && \
    pnpm dev:test && \
    pnpm dev:format && \
    pnpm dev:lint && \
    pnpm build

EXPOSE 3001

CMD ["pnpm", "start"]

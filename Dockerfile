FROM node:25
WORKDIR /app
COPY . .

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

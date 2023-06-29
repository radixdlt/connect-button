FROM node:20.3.0-alpine AS installer

WORKDIR /app

COPY . .

RUN npm ci

RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build:storybook

FROM nginx:alpine AS storybook

WORKDIR /app

COPY --from=installer /app/storybook-static /usr/share/nginx/html
COPY --from=installer /app/nginx/mime.types /etc/nginx/mime.types
COPY --from=installer /app/nginx/default.conf /etc/nginx/conf.d/default.conf

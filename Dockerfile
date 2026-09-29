# --- Build stage: static-generate the site ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Baked into the prerendered HTML at build time (sitemap, canonical URLs, OG
# tags) — override with --build-arg when building for real deployment.
ARG NUXT_PUBLIC_SITE_URL=https://example.com
ARG NUXT_APP_BASE_URL=/
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV NUXT_APP_BASE_URL=$NUXT_APP_BASE_URL

RUN yarn generate

# --- Runtime stage: serve the static output ---
FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/.output/public /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

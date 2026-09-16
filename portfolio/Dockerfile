# ── Build stage ─────────────────────────────────────────────────────
FROM node:lts-alpine AS build

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /app

# Install dependencies first so Docker can cache this layer
# whenever only source files change, not package.json
COPY package*.json ./
RUN npm ci

# Copy everything else (src, public assets, configs) and build
COPY . ./
RUN npm run build

# ── Serve stage ─────────────────────────────────────────────────────
FROM caddy

WORKDIR /app

COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite

# Only the built static output is copied — node_modules and source
# files never make it into the final image
COPY --from=build /app/dist ./dist

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]

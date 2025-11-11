# Basis-Image
FROM node:20-alpine AS deps

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nur package-Dateien kopieren, um Layer-Caching zu nutzen
COPY package*.json ./

# Dependencies installieren
RUN npm ci

# Build-Phase
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Produktions-Image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Next.js braucht den .next-Ordner
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

# Standardport
EXPOSE 3000

# Startkommando
CMD ["npm", "start"]

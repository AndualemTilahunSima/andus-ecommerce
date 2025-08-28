FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS dev-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY . .

# Runtime image
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app .

EXPOSE 3001
CMD ["node", "src/server.js"]


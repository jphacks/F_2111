# 参考 https://qiita.com/ragnar1904/items/e49aa82756dfbf7cf2f5
FROM node:16-alpine AS build

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY . .
RUN NODE_ENV=production npm run build

FROM node:16-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /build/package.json ./

COPY --from=build /build/.next ./.next
COPY --from=build /build/next.config.js ./next.config.js
COPY --from=build /build/public ./public
COPY --from=build /build/node_modules ./node_modules

EXPOSE 3000
CMD ["npm","run", "start"]
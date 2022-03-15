FROM node:17-alpine as base
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:ts

FROM node:17-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=base /usr/app/dist ./dist

COPY .env .

EXPOSE 4000
CMD node dist/index.js
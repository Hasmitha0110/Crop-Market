# Backend (Node Express)
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]

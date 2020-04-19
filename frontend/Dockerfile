FROM node:10

WORKDIR /app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

CMD ["node"]

FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]

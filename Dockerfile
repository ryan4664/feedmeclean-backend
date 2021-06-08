FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn global add nodemon ts-node typescript
RUN yarn

COPY . .

EXPOSE 8080

RUN tsc


ENTRYPOINT  nodemon -L ./dist/index.js 
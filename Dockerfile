FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g add nodemon ts-node typescript knex
RUN npm install

COPY . .

EXPOSE 8080

RUN tsc


ENTRYPOINT [ "npm", "start" ]
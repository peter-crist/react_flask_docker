FROM node:latest

COPY . /src
WORKDIR /src

RUN npm install --loglevel warn
RUN npm run production

EXPOSE 8081

CMD [ "node", "server.js" ]
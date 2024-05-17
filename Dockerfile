FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY /public /app/public
COPY /src /app/src

CMD ["npm", "start"]

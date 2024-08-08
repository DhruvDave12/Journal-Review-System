FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .

COPY .env .env

EXPOSE 1337

CMD ["npm", "run", "dev"]

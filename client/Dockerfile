# Dockerfile

FROM node:16.15-alpine3.14
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 8081
 
CMD [ "npm", "start" ]
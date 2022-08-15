# Dockerfile

FROM node:16.15-alpine3.14
RUN mkdir -p /opt/server
WORKDIR /opt/server
RUN adduser -S server
COPY . .
RUN npm install
# RUN npm install --save pm2
RUN chown -R server /opt/server
USER server
EXPOSE 8080
CMD [ "node", "server.js" ]
# docker image for building and starting the app. npm run build is run in the image
FROM node:17.0.1-alpine3.14
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
CMD npm run build && npm run register && npm run start
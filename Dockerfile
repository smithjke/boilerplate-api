FROM node:16-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./package.json .
COPY --chown=node:node ./tsconfig.json .
COPY --chown=node:node ./yarn.lock .

RUN yarn
RUN yarn build

CMD [ "node", "." ]

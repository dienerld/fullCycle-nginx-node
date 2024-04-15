FROM node:21.1-alpine

# create a new user and group for the app
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /home/app

RUN npm install -g pnpm --unsafe-perm && npm cache clean --force

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
  && apk add --no-cache wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin

USER app

WORKDIR /home/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm install

COPY --chown=node:node ./src ./src

EXPOSE 8080

ENTRYPOINT [ "pnpm", "dev" ]

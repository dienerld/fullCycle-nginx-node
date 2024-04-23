FROM node:21.1-alpine

# create a new user and group for the app
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /home/app

WORKDIR /home/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
  && apk add --no-cache wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin

USER app

COPY --chown=app:app package.json .

COPY --chown=app:app yarn.lock .

RUN yarn

COPY --chown=app:app ./src ./src

ENTRYPOINT [ "yarn", "start" ]

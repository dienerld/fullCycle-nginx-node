FROM nginx:1.25-alpine

ENV DOCKERIZE_VERSION v0.7.0

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN apk update --no-cache \
  && apk add --no-cache wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin

CMD [ "nginx", "-g", "daemon off;"]

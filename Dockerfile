# build image
FROM node:11.6.0 as builder
ARG NODE_ENV="production"
ARG PORT=8080
ARG SASS_PATH


# custom build args
ARG PUBLIC_KEY_EXAMPLE="default"


WORKDIR /home/app

#COPY . .
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./webpack.config.js ./webpack.config.js

RUN ls
RUN npm install --no-package-lock
RUN npm run build

# deploy image
FROM nginx:alpine
ARG PORT
ENV PORT=$PORT
COPY --from=builder /home/app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf.t
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf.t && nginx -g 'daemon off;'

# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
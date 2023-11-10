FROM node:alpine as build
ARG BuildCommand

#Build the angular app
WORKDIR /app

COPY src/package.json .

RUN npm install -f

COPY src/ .

RUN npm run $BuildCommand --  --base-href /en/atlp-portal-ui/

#Copy the dist files to nginx image
FROM nginx:alpine

COPY --from=build /dist/en/atlp-portal-ui /usr/share/nginx/html
COPY /deploy/docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

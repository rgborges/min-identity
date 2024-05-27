FROM node:12.7-alpine AS build-step
WORKDIR /dist

RUN npm install
COPY . .
RUN npm build --prod


FROM ngnix:alpine 
COPY --from=build-step app/dist/ /usr/share/ngnix/html
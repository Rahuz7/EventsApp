FROM node:18 as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./users-service/package.json /usr/src/app

RUN npm install

RUN mkdir -p /dist/node_modules
RUN cp -r node_modules/* /dist/node_modules/
ENV NODE_PATH /dist/node_modules

COPY ./users-service/ /usr/src/app


COPY ./module/ /usr/src/app/module/

EXPOSE 6000
CMD npm start;
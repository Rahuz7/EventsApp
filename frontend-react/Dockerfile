FROM node:18 as base
# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#install dependencies
COPY package.json /usr/src/app
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# Build the app
RUN npm install -g npm@latest
RUN npm install --silent

RUN npm install react-scripts@3.4.1 -g --silent
RUN mkdir -p /dist/node_modules
RUN cp -r node_modules/* /dist/node_modules/
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb lsof
ENV NODE_PATH /dist/node_modules
# bundle source
COPY . /usr/src/app
EXPOSE 6000

CMD npm test ; npm start
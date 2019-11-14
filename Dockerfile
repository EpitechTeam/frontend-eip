# Extending image
FROM node:carbon-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /app

# Install app dependencies
COPY package.json /usr/src/app/


# Install git
RUN apk add --no-cache git

RUN npm install


# Bundle app source
COPY . /usr/src/app

# Port to listener
# Environment variables

EXPOSE 8181

ENV PRODUCTION_PORT 8181
ENV NODE_ENV production

ENV PUBLIC_PATH "/"

RUN rm -rf run

RUN npm run build
RUN mv --force build run
RUN mv --force run/index.html base/index.html

# Main command
CMD [ "node", "index.js" ]
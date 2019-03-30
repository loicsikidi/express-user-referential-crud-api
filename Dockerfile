FROM node:10.15.3-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm ci --only=production \
    && apk del .gyp

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]

USER node

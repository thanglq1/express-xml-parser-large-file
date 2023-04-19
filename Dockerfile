FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Fix issue "Could not find any python installation to use"
RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

RUN npm i

COPY . .

CMD ["npm", "run", "start"]
FROM node:12-alpine

RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python

# Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

WORKDIR /home/node/app
ADD . /home/node/app

RUN npm ci --no-optional

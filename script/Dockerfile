FROM node:18.14.2-alpine as base
RUN mkdir -p /opt/script
WORKDIR /opt/script
RUN adduser -S client
RUN chown -R client /opt/script
COPY package*.json ./

# DEVELOPMENT script PROFILE
FROM base as development
ENV NODE_ENV=development
RUN npm install && npm cache clean --force
COPY . ./

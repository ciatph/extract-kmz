FROM node:18.14.2-alpine as base
RUN mkdir -p /opt/script
WORKDIR /opt/script
# Use the default node user
RUN chown -R node /opt/script
COPY package*.json ./

# DEVELOPMENT script PROFILE
FROM base as development
ENV NODE_ENV=development
RUN npm install && npm cache clean --force
COPY . ./
USER node
# Stop the container from exiting
CMD tail -f /dev/null

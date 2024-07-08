ARG NODE_VERSION=21.6.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD node ./index.js


# FROM node

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# CMD ["npm", "run", "start_docker"]
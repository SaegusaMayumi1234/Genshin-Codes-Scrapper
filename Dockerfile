# Use official Node 22 LTS image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the project (creates ./dist)
RUN yarn build

# Copy app source
COPY . .

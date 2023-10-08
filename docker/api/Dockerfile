# Use an official Node runtime as a parent image
FROM node:20.8 AS build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing node modules
COPY package.json package-lock.json ./

# Install npm packages
RUN npm install

# Copy local code to the container
COPY . .

# Build the project
RUN npm run build

# Start a new, smaller image to reduce size
FROM node:20.8 AS production-stage

# Set the working directory
WORKDIR /app

# Copy only the compiled output and node modules from the build stage
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules

# Expose API port
EXPOSE 3000

# Start your Node.js app
CMD ["npm", "start"]

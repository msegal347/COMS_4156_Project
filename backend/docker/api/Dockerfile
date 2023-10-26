# Use Node.js 16 LTS as a parent image
FROM node:16 AS test-stage

# Set the working directory in the container
WORKDIR /workspace

# Create a user named vscode
RUN useradd -ms /bin/bash vscode

# Change the ownership of /workspace
RUN chown -R vscode:vscode /workspace

# Switch to vscode user
USER vscode

# Copy package.json and package-lock.json for installing node modules
# The copy operation will be done as vscode user, so there should be no permission issues.
COPY --chown=vscode:vscode ../package.json ../package-lock.json ./

# Install npm packages
RUN npm install

# Copy local code to the container
COPY --chown=vscode:vscode . .

# The build operation is optional for TypeScript projects
# Uncomment the next line if needed
# RUN npm run build

# Expose API port
EXPOSE 3000

# Set up the command to run your app for testing
CMD ["npm", "start"]

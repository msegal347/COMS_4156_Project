# Use Node.js 16 LTS as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /workspace

# Create a user named vscode
RUN useradd -ms /bin/bash vscode

# Install development tools
RUN apt-get update && apt-get install -y vim git

# Change the ownership of /workspace
RUN chown -R vscode:vscode /workspace

# Switch to vscode user
USER vscode

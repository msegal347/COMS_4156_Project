# Use the official MongoDB image
FROM mongo:latest

# Copy the MongoDB initialization script
COPY mongo-init/mongo-init.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod"]
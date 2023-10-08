# Use a specific version of the official MongoDB image
FROM mongo:6.1.0

# Copy the MongoDB initialization script
COPY mongo-init.js /docker-entrypoint-initdb.d/

# Expose the MongoDB port
EXPOSE 27017

# Start the MongoDB server
CMD ["mongod"]

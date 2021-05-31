FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy js files to container
COPY . .

# Install dependencies
RUN npm install

# Binds to port
EXPOSE 8000

# Start application
CMD ["node","hello-2.js"]


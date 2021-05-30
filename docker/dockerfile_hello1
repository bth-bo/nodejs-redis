FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy files to container
COPY . .

# Install dependencies
RUN npm install

# Binds to port
EXPOSE 8000

# Start application
CMD ["node","./app/hello-1.js"]


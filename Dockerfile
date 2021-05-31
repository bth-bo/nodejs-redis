FROM node:10

# Create app directory
WORKDIR /usr/src/app

<<<<<<< HEAD
# Copy js files to container
=======
# Copy files to container
>>>>>>> c1e01c47c4655b1d744d4f437b4a3cf012afacac
COPY . .

# Install dependencies
RUN npm install

# Binds to port
EXPOSE 8000

# Start application
<<<<<<< HEAD
CMD ["node","./app/hello-2.js"]
=======
CMD ["node","./app/hello-1.js"]
>>>>>>> c1e01c47c4655b1d744d4f437b4a3cf012afacac

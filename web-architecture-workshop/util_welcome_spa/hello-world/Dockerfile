# Stage 1: Build the React application
FROM node:14-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React application using a lightweight server
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]
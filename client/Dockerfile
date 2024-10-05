# Stage 1: Build the React app with a compatible Node.js version
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files and build the app
COPY . .
RUN npm run build

# Stage 2: Run the app directly using npm
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy only the built app from the previous stage
COPY --from=build /usr/src/app /usr/src/app

# Expose the port your app runs on
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]

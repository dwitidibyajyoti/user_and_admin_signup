# backend/Dockerfile

# Step 1: Use the official Node.js image
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application
COPY . .

# Step 6: Expose the port
EXPOSE 5000

# Step 7: Start the application
CMD ["npm", "start"]

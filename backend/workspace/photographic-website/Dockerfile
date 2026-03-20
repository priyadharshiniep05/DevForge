# Use the official Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Next.js defaults to port 3000, but we can set it to 80 for consistency with the user's run command
ENV PORT 80
EXPOSE 80

# Start the Next.js server
CMD ["npm", "start"]
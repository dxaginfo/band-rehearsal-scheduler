# Stage 1: Build the TypeScript application
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy build files from previous stage
COPY --from=build /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
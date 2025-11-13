# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source
COPY src/fe ./src/fe
COPY src/build.json ./src/
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY tsconfig.json ./

# Build frontend
RUN npm run build:fe

# Stage 2: Setup backend and serve
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files and install all dependencies (need tsx for production)
COPY package*.json ./
RUN npm ci

# Copy backend source
COPY src/be ./src/be
COPY src/build.json ./src/

# Copy built frontend from previous stage
COPY --from=frontend-build /app/dist ./dist

# Expose port
EXPOSE 3031

# Set environment
ENV NODE_ENV=production

# Start the application (this will build FE and run BE with tsx)
CMD ["npm", "start"]
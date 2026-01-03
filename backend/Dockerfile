FROM node:20-bullseye

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code (but exclude node_modules)
COPY . .

# Clean install and regenerate Prisma client
RUN rm -rf node_modules package-lock.json \
  && npm install \
  && npx prisma generate

# Expose port
EXPOSE 5000

# Install netcat for wait script
RUN apt-get update \
  && apt-get install -y --no-install-recommends netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# Start the application with wait script
CMD ["sh", "-c", "echo 'Waiting for database...' && until nc -z postgres 5432; do echo 'Waiting for postgres...'; sleep 2; done && echo 'Database is ready!' && npm run dev"]


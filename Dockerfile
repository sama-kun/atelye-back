# Stage 1: Build
FROM node:18 as build

WORKDIR /app

# Install NestJS CLI
RUN npm install --global @nestjs/cli

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy all files and build
COPY . .
RUN yarn run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Install production dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy build
COPY --from=build /app/dist /app/dist

# Copy ormconfig and tsconfig
COPY ormconfig.ts ./
COPY tsconfig.json ./

# Start
CMD sh -c "yarn typeorm migration:run && yarn start:prod"

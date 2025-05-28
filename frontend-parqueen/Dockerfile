FROM node:20-alpine as build

WORKDIR /app

# Define build arguments for environment variables
ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
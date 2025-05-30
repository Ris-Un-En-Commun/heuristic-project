FROM node:20-alpine as build

WORKDIR /app

ARG VITE_BACKEND_URL

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN VITE_BACKEND_URL=$VITE_BACKEND_URL npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:12-alpine AS build

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build/ /var/www
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx","-g","daemon off;"]
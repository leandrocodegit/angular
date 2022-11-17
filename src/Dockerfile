<<<<<<< HEAD
#stage 1 
FROM node:latest as node 
WORKDIR /app 
COPY . . 
RUN npm install 
RUN npm run build --prod
#stage 2 
FROM nginx:alpine 
COPY nginx.conf /etc/nginx/nginx.conf
COPY front-vitrine /usr/share/nginx/html
 
=======
FROM nginx
COPY src/nginx.conf /etc/nginx/nginx.conf
COPY src/front-vitrine /usr/share/nginx/html
>>>>>>> dac7fbb629acab8dddff0d5353312893d7549199

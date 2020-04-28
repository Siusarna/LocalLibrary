# => Build container
FROM node:10-alpine as build

WORKDIR /localLibrary-client

COPY package.json /localLibrary-client/package.json

RUN npm install

RUN npm install react-scripts -g

COPY . /localLibrary-client

RUN npm run build

# => Run container
FROM nginx:1.16.0

COPY --from=build /localLibrary-client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

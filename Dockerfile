FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY site/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

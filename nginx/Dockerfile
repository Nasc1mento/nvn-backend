# Source: https://wiki.alpinelinux.org/wiki/Nginx 

FROM alpine:3.21.2
RUN apk update && apk add nginx 
RUN adduser -D -g 'www' www
RUN mkdir /www
RUN chown -R www:www /var/lib/nginx && chown -R www:www /www
COPY nginx.conf /etc/nginx/
COPY proxy_params /etc/nginx/
COPY *.html /www/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


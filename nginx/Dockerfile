FROM nginx:latest

ARG NGINX_CONFIG

WORKDIR /nginx

RUN rm /etc/nginx/conf.d/*
COPY $NGINX_CONFIG /etc/nginx/conf.d/
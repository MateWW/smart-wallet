FROM node:latest

WORKDIR backend

RUN apt-get update
RUN apt-get install -y netcat

COPY ./backend .

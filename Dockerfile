FROM ubuntu:18.04
RUN apt-get update && apt-get install -y nginx && apt-get install -y curl && apt-get install unzip
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
RUN curl -sSL https://github.com/pratik2709/Pomodoro/archive/master.zip > master.zip && unzip master.zip -d /var/www && rm master.zip
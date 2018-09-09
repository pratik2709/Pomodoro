FROM ubuntu:18.04
RUN apt-get update && apt-get install -y nginx
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]

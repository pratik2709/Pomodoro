FROM nginx:latest
ADD ./config/nginx.conf /etc/nginx/
ADD ./config/nginxconfig.io /etc/nginx/nginxconfig.io
ADD ./config/conf.d /etc/nginx/conf.d
EXPOSE 8000
CMD ["nginx","-g","daemon off;"]
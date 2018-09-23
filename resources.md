https://stackoverflow.com/questions/26733678/how-to-center-a-css-hexagon
https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile
https://github.com/docker-library/golang/blob/1a422afd7db928a821e97906ed27ed606e2f072a/1.3/Dockerfile
https://stackoverflow.com/questions/33682123/dockerfile-strategies-for-git

View docker images - docker images

See all dockers with names: docker ps -a

Run  a docker image: docker run --name mynginx5 -P -d ubuntu-spaceship

Build a dockerImage file: docker build -t "ubuntu-spaceship" .

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq


Specific port mapping:
Run the app, mapping your machine’s port 4000 to the container’s published port 80 using -p:

docker run -p 4000:80 friendlyhello

Stop docker: docker stop <image-name>

Remove exited containers: 
docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm


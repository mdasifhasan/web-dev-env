#!/bin/bash

docker run \
  -u root \
  --rm \
  -d \
  -p 7070:8080 \
  -p 50000:50000 \
  -v $HOME/jenkins-home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd):/home \
  --name jenkins \
  jenkinsci/blueocean
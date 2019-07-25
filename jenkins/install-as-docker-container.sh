#!/bin/bash

docker run \
  -u root \
  -d \
  --restart=always \
  -p 7070:8080 \
  -p 50000:50000 \
  -v $HOME/jenkins-home:/var/jenkins_home \
  -v $HOME/jenkins-cache/npm-cache:/root/.npm \
  -v $HOME/jenkins-cache/cypress-cache:/root/.cache \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd):/home \
  --name jenkins \
  jenkinsci/blueocean
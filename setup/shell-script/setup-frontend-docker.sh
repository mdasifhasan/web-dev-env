#!/bin/bash

source library.sh

create_front_end(){
  # exist=`docker container inspect back &>/dev/null` || "none"
  name="front"
  find_available_container_name
  # echo $name

  port="3000"
  if [ "$1" != "" ];
  then
    port="$1"
  fi
  # echo $port

  local network_name="net-web-env"
  
  echo Creating docker container for front end, name: $name, port: $port
  frontend_dir=`eval "cd $(dirname "$0") && cd ../frontend && pwd"`
  echo Mounting directory \"$frontend_dir\" to \"/app\"
  docker run \
    --rm \
    -d \
    -it \
    --network "$network_name" \
    -e PORT="$port" \
    -p "$port":"$port" \
    --name "$name" \
    -v "$frontend_dir:/app" \
    node:12-alpine
}

# skip if sourced from another shell script
[[ "${#BASH_SOURCE[@]}" -gt "1" ]] && { return 0; }
create_front_end $1
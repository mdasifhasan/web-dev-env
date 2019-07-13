#!/bin/bash

source library.sh

create_back_end(){
  # exist=`docker container inspect back &>/dev/null` || "none"
  name="back"
  find_available_container_name
  # echo $name

  port="4000"
  if [ "$1" != "" ];
  then
    port="$1"
  fi
  # echo $port

  local network_name="net-web-env"

  echo Creating docker container for back end, name: $name, port: $port
  backend_dir=`eval "cd $(dirname "$0") && cd ../backend && pwd"`
  echo Mounting directory \"$backend_dir\" to \"/app\"
  docker run \
    --rm \
    -d \
    -it \
    --network "$network_name" \
    --expose="$port" \
    -e PORT="$port" \
    -p "$port":"$port" \
    --name "$name" \
    -v "$backend_dir:/app" \
    golang:1.12-alpine3.10
}

# skip if sourced from another shell script
[[ "${#BASH_SOURCE[@]}" -gt "1" ]] && { return 0; }
create_back_end $1
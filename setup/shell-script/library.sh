#!/bin/bash

find_available_container_name(){
  local c=0
  local exists=0
  origname=$name
  while (($exists == 0))
  do
    # echo trying $name
    docker container inspect "$name" &>/dev/null
    exists=$?
    # echo $exists
    if (($exists == 0));
    then
    #   echo name exists
      ((c++))
      name="$origname$c"
    fi
  done
#   echo found available name: $name
}

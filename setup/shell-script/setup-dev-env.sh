#!/bin/bash

source setup-backend-docker.sh
source setup-frontend-docker.sh

network_name="net-web-env"

sh ./setup-network.sh

create_back_end $1
status_back=$?
back_name=$name

if (( ($status_back != 0) )); then
    echo -e "\nfailed to create the backend, try changing the port for the backend"
    exit $status_back
fi

echo -e "backend created successfully\n"

create_front_end $2
status_front=$?
front_name=$name

# echo $back_name $status_back $front_name $status_front

if (( ($status_front != 0) )); then
    echo -e "\nfailed to create the frontend, try changing the port for the frontend"
    if (( ($status_back == 0) )); then
        echo killing backend
        docker container kill "$back_name" &>/dev/null
    fi
    exit $status_front
else
    echo -e "frontend created successfully"
fi

exit $status_front
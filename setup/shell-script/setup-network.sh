#!/bin/bash

network_name="net-web-env"
docker network inspect "$network_name" &>/dev/null || docker network create --driver bridge "$network_name"
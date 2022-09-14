#!/bin/bash

docker build -t chemindulocal/site:latest --platform linux/amd64 .
docker tag chemindulocal/site:latest chemindulocal/site:$1
docker push chemindulocal/site:latest
docker push chemindulocal/site:$1
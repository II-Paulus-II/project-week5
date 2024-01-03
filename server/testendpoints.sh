#!/bin/bash 

curl http://localhost:8080/message
echo -e
curl http://localhost:8080/getmemory
echo -e
curl -X GET \
  -H "Content-type: application/json" \
  -H "Accept: application/json" \
  -d '{"level":"1"}' \
  "http://localhost:8080/beginlevel"
echo -e
curl -X GET \
  -H "Content-type: application/json" \
  -H "Accept: application/json" \
  -d '{"level":"1"}' \
  "http://localhost:8080/begintest"
echo -e

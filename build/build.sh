#!/bin/bash
#this is obviously not a proper build system for a large application
#not the best at writing shell scripts so going to copy and paste
#does a clean build every time
#the ui project can take some time to load everything
#the permissions on the node_modules folders will probably be readonly at host level

cd ../config && rm -rf node_modules && npm install;
cd ../lib/base-client && rm -rf node_modules && npm install;
cd ../instagram-client && rm -rf node_modules && npm install;
cd ../nomad-client && rm -rf node_modules && npm install;
cd ../errors && rm -rf node_modules && npm install;
cd ../../server && rm -rf node_modules && npm install;
cd ../ui && rm -rf node_modules .next app/.next && npm install && npm run build-dev;

exit;

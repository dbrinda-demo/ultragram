FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y build-essential libudev-dev curl gosu

ENV NODE_VERSION v20.5.1
ENV NVM_VERSION v0.39.5
ENV NVM_DIR /usr/local/nvm
RUN mkdir $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash

ENV NODE_PATH $NVM_DIR/$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

RUN npm config -g set package-lock false

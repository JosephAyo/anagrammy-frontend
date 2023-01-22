#! /bin/sh

yarn install
yarn build >> app-build.log
yarn start >> app-start.log
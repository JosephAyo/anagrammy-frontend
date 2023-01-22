#! /bin/sh

pwd
npm i -g yarn
yarn install
yarn build >> app-build.log
yarn start >> app-start.log
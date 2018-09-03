#!/usr/bin/env bash
cp .env.sample .env
createdb -U postgres poryectok2018
npm install
knex migrate:latest
knex seed:run

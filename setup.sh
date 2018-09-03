cp .env.sample .env
createdb -U postgres sticker-mania
npm install
knex migrate:latest
knex seed:run

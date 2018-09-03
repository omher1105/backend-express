// Update with your config settings.

require('dotenv').config();

module.exports = {

    development: {
        client: 'pg',
        connection: {
            database: 'proyectok2018',
            user: 'postgres',
            password: '123456'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }

};

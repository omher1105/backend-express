exports.seed = (knex, Promise) => {
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3')
      .then(() => {
        const users = [
          {
            id: 1,
            email: 'berto.ort@gmail.com',
            password: 'proyectok2018',
            created_at: new Date()
          },
          {
            id: 2,
            email: 'hello@cjr.co.de',
            password: 'proyectok2018',
            created_at: new Date()
          }
        ];
        return knex('user').insert(users)
      })
};

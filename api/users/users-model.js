const db = require('../../data/dbConfig');

function findBy(filter) {
  return db('users').where(filter)
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      console.log('Inserted ID:', ids[0]);
      return findBy({ id: ids[0] })
    });
}

module.exports = {
  findBy,
  add,
};

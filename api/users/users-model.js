const db = require('../../data/dbConfig');

function findBy(filter) {
  return db('users').where(filter)
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return findBy({ id: ids[0] })
    });
}

module.exports = {
  findBy,
  add,
};

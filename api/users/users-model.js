const db = require('../../data/dbConfig');

function findBy(filter) {
  return db('users').where(filter)
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      console.log('Inserted ID:', ids[0]);
      return findBy({ id: ids[0] })
    });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => findById(id));
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function getAll() {
  return db('users');
}

function exists(filter) {
  return db('users').where(filter).first().then(user => !!user);
}


module.exports = {
  findBy,
  add,
  update,
  remove,
  getAll,
  findById,
  exists,
};

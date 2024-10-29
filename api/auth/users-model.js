const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data/auth.db3')

function findBy(filter) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [filter.username], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

function add(user) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, user.password], function(err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id: this.lastID, ...user })
      }
    })
  })
}

module.exports = {
  findBy,
  add
}

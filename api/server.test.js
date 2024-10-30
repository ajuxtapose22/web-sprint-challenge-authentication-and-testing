
const db = require('../data/dbConfig')
const Users = require('./users/users-model')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})


afterAll(async () => {
    await db.migrate.rollback()
    await db.destroy()
})

describe('users model', () => {
   beforeEach(async () => {
    await db('users').truncate() 
  })

  // Test inserting multiple users and checking the length of records
  describe('add()', () => {
    it('should insert the provided users into the db', async () => {
      // Insert 2 users
      await Users.add({ username: 'user1', password: 'password1' })
      await Users.add({ username: 'user2', password: 'password2' })
        
        const users = await db('users')
        expect(users).toHaveLength(2)
    })

    // Test inserting a single user and checking the returned user object
    it('should insert the provided user into the db and return it', async () => {
      // Insert a single user and get the returned user object
      let user = await Users.add({ username: 'user1', password: 'password1' })
      expect(user[0].username).toBe('user1')

      // Insert another user and check its returned object
      user = await Users.add({ username: 'user2', password: 'password2' })
      expect(user[0].username).toBe('user2')
    })
  })
})



const { JWT_SECRET } = require('../config/secrets'); // Store your JWT secret in a config file
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const restrict = require('../middleware/restricted');
const router = express.Router();

console.log('JWT Secret:', JWT_SECRET); // This should log the value, not undefined


// [POST] /api/auth/register - Create a new user
router.post('/register', async (req, res, next) => {
/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */


  const { username, password } = req.body;  

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' })
  } 
  
  try {
    const sameUsername = await Users.findBy({ username }).first()
    if (sameUsername) {
      return res.status(400).json({ message: 'username Taken' })
    }


    const hash = bcrypt.hashSync(password, 8); // Hash the password
    const newUser = await Users.add({ username, password: hash });
    res.status(201).json({
        id: newUserser.id,
        username: newUser.username,
        password: newUser.password
    });
  } catch (err) {
    next(err);
  }
})



// LOGIN ////////////////////////////////


router.post('/login', (req, res) => {
  const { username, password } = req.body;

if(!username || !password ) {
  return res.status(400).json({ message: "username and password required" })
}


  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line

        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});




function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  console.log('JWT Secret:', JWT_SECRET); // Log the secret to ensure it has a value
  return jwt.sign(payload, JWT_SECRET, options);
}


module.exports = router
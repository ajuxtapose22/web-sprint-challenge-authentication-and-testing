const { JWT_SECRET } = require('../config/secrets'); 
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const router = express.Router();

// console.log('JWT Secret:', JWT_SECRET);

// POST Register Endpoint
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password required' });
  }

  try {
    const existingUser = await Users.findBy({ username }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'username taken' });
    }

    const hash = bcrypt.hashSync(password, 8);
    const newUserArray = await Users.add({ username, password: hash });
    const newUser = newUserArray[0]
    // console.log('New User Created:', newUser); 

    if (!newUser || !newUser.id) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: newUser.password, 
    });
  } catch (err) {
    console.error('Registration error:', err);
    next(err);
  }
});




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
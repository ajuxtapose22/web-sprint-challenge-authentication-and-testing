require('dotenv').config();
const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');
const modifyResponse = require('./middleware/modifyResponse.js')

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, modifyResponse, jokesRouter); // only logged-in users should have access!



module.exports = server;

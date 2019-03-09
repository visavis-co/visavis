require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const user = require('./controllers/usersController');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/**
 * Post to /login
 *
 * Expecting { email, password } to be in request body
 *
 * 1. Verify if a user is in the database, Set res.locals to user id
 * 2. TODO: Create a cookie / session to login the user
 * 3. TODO: Make a match for new user if there are any other users that are matchable.
 * 4. TODO: Return user information with matches
 *
 */

app.post(
  '/login',
  user.verifyUser,
  user.getUser,
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - Post to /api/user
 *
 * Expecting { email, fullName, password } to be in request body
 *
 * 1. Create a user in the database, Set res.locals to user id that was just added
 * 2. TODO: Create a cookie / session to login the user
 * 3. TODO: Make a match for new user if there are any other users that are matchable.
 * 4. TODO: Return user information with matches
 *
 */

app.post(
  '/api/user',
  user.createUser,
  user.getUser,
  (req, res) => {
    res.send(res.locals.user);
  }
);


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/


require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const user = require('./controllers/usersController');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/**
 * API - Post to /api/user
 *
 * Expecting { email, fullName, password } to be in request body
 *
 * 1. Create a user in the database, Set res.locals to user id that was just added
 * 2. Create a cookie / session to login the user
 * 3. Make a match for new user if there are any other users that are matchable.
 *
 */

app.post('/api/user', user.createUser, (req, res) => {
  res.send({ newUserId: res.locals.newUserId });
});


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/


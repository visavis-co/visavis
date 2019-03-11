require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const user = require('./controllers/usersController');
const matches = require('./controllers/matchesController');
const auth = require('./controllers/authController');
const bodyParser = require('body-parser');
const email = require('./controllers/emailController');

app.use(bodyParser.json());   // run body parser on all server requests
app.use(cookieParser());      // run cookie parser on all server requests

/**
 * POST to /login - User login
 *
 * Expecting { email, password } to be in request body
 *
 * 1. Verify if a user is in the database, Set res.locals to user id
 * 2. Create a cookie / session to login the user
 * 3. TODO: Make a match for new user if there are any other users that are matchable.
 * 4. Return user information with matches
 *
 */

// call this to create matches and send email
// matches.matchAndDo(email.mailMatch);


app.post(
  '/login',
  user.verifyUser,
  user.getUser,
  matches.getUserMatches,
  auth.setSSIDCookie,
  auth.startSession,
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - POST to /api/user - Creates a new user in the app
 *
 * Expecting { email, fullName, password } to be in request body
 *
 * 1. Create a user in the database, Set res.locals to user id that was just added
 * 2. Create a cookie / session to login the user
 * 3. TODO: Make a match for new user if there are any other users that are matchable.
 * 4. TODO: Return user information with matches
 *
 */

app.post(
  '/api/user',
  user.createUser,
  user.getUser,
  matches.getUserMatches,
  auth.setSSIDCookie,
  auth.startSession,
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - GET to /api/user - Check authentication with cookie from front end
 *
 * 1. Get token information from user cookie and find user session
 * 2. Get user information and return it
 * 4. TODO: Return user information with matches
 *
 */

app.get(
  '/api/user',
  auth.checkLogin,
  user.getUser,
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - POST to /logout - User logging out
 *
 * Get userId from body and delete sessionToken from users table
 * and clear cookie
 */
app.post('/logout', auth.logout);

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// error handling catch all
app.use((err, req, res, next) => {
  res.status(418).send({name: err.name, msg:err.message});
})

app.listen(3000); //listens on port 3000 -> http://localhost:3000/


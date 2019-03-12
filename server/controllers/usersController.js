const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const userController = {};
/***********************************************/
//
// TABLE SCHEMAS
//
// CREATE TABLE users(
//   id serial PRIMARY KEY,
//   email VARCHAR UNIQUE NOT NULL,
//   fullName VARCHAR,
//   password VARCHAR,
//   pictureUrl VARCHAR,
//   dateJoined timestamp not null default CURRENT_TIMESTAMP,
//   lastLogin timestamp not null default CURRENT_TIMESTAMP,
//   matchable boolean,
//   sessionToken VARCHAR
// );
//
// CREATE TABLE organizations(
//   id serial PRIMARY KEY,
//   name VARCHAR UNIQUE NOT NULL,
//   dateCreated timestamp not null default CURRENT_TIMESTAMP
// );
//
// CREATE TABLE users_organizations(
//   user_id INTEGER REFERENCES users(id),
//   org_id INTEGER REFERENCES organizations(id),
//   isAdmin BOOLEAN,
//   PRIMARY KEY(user_id, org_id)
// );
//


/**
 * createUser - Obtain email, fullName and password from the request body,
 * insert new user into database
 *
 * @param req - expecting email, fullName and password as json in body
 *
 */
userController.createUser = async (req, res, next) => {
  // connect to db
  const client = new Client();
  await client.connect();

  // get variables from req.body
  const { email, fullName, password } = req.body;

  // check for valid user input
  if (!email || !fullName || !password) next(new Error('Invalid user input'));

  // hash the password
  var salt = bcrypt.genSaltSync(10);
  var hashed = bcrypt.hashSync(password, salt);

  // insert new user into database. Return that new user's id
  // try {
    const ret = await client.query(
      'INSERT INTO users(email, fullName, password, pictureUrl, matchable) VALUES( $1, $2, $3, $4, $5) RETURNING id',
      [email, fullName, hashed, 'default-profile.jpg', 'true']
    );
  // } catch (err) {
  //   throw new Error('Error adding user - ' + err);
  // }

  // set the res.locals userId to be the new user's id
  res.locals.userId = ret.rows[0].id;

  // close db connection
  await client.end();
  next();
}


/**
 * verifyUser - Obtain email and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 *
 * @param req - expecting email and password as json in body
 *
 */
userController.verifyUser = async (req, res, next) => {

  // connect to db
  const client = new Client();
  await client.connect();

  // get variables from req.body
  const { email, password } = req.body;

  // check for valid user input
  if (!email || !password) next(new Error('Login Error: Missing email / password'));

  // get user from database that matches email
  const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  // close db connection
  await client.end();

  // check for returned user
  if (user) {
    // Found a user. Verify password now.
    if (bcrypt.compareSync(password, user.password)) {
      // password matches! set the userId in res.locals and next()
      res.locals.userId = user.id;
      next();

    } else {
      // password doesn't match. end chain
      next(new Error('Wrong username/password'));
    }
  } else {
    // User not found. end chain
    next(new Error('Wrong username/password'))
  }
};


/**
 * getUser - get user info from database that matches res.locals.userId
 */
userController.getUser = async (req, res, next) => {

  // connect to db
  const client = new Client();
  await client.connect();

  // get user from database that matches res.locals.userId
  const result = await client.query('SELECT * FROM users WHERE id = $1', [res.locals.userId]);
  const user = result.rows[0];

  // close db connection
  await client.end();

  // check for returned user
  if (user) {
    // Found a user. Set user prop in res.locals.user and go next
    res.locals.user = { user };
    next();
  } else {
    // User not found. end chain
    next(new Error('User does not exist'));
  }
};

module.exports = userController;

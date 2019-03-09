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
//   matchable boolean
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

userController.createUser = async (req, res, next) => {
  // connect to db
  const client = new Client();
  await client.connect();

  // get variables from req.body
  const { email, fullName, password } = req.body;

	console.log('userController.createUser -> req.body', req.body)

  // check for valid user input
  if (!email || !fullName || !password) throw new Error('Invalid user input');

  // hash the password
  var salt = bcrypt.genSaltSync(10);
  var hashed = bcrypt.hashSync(password, salt);

  // insert new user into database. Return that new user's id
  const ret = await client.query(
    'INSERT INTO users(email, fullName, password, pictureUrl, matchable) VALUES( $1, $2, $3, $4, $5) RETURNING id',
    [email, fullName, hashed, 'default-profile.jpg', 'true']
  );

  res.locals.newUserId = ret.rows[0].id;
  await client.end();
  next();
}

module.exports = userController;

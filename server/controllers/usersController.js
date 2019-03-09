const { Client } = require('pg');

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

async function createUser(req, res) {
  // connect to db
  const client = new Client();
  await client.connect();

  // get stuff
  //const allItems = await client.query('SELECT * FROM stuff');

  // send back the menu items organized by category
  res.send(allItems);
  await client.end();
}

module.exports = { createUser };

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

async function createUser(req, res, next) {
  // connect to db
  const client = new Client();
  await client.connect();

  // get variables from req.body 
  const {email, fullName, password} = req.body;

  const ret = await client.query('INSERT INTO menu(menu_id, name, "desc", desc2, price, cat_id) VALUES( $1, $2, $3, $4, $5, $6) RETURNING id',
                                [itemId, itemName, itemDesc, itemDesc2, itemPrice, itemCat]);

  res.locals.newUserId = ret.rows[0].id;
  await client.end();
  next();
}

module.exports = { createUser };

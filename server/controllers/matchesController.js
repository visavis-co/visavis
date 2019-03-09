const { Client } = require('pg');

/***********************************************/
//
// TABLE SCHEMAS
//
// CREATE TABLE matches(
//   id SERIAL PRIMARY KEY,
//   user1_id INTEGER REFERENCES users(id),
//   user2_id INTEGER REFERENCES users(id),
//   dateStarted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   inPerson BOOLEAN,
//   location VARCHAR,
//   CONSTRAINT unique_users UNIQUE(user1_id, user2_id)
// );

async function createMatch(req, res) {
  // connect to db
  const client = new Client();
  await client.connect();

  // get stuff
  //const allItems = await client.query('SELECT * FROM stuff');

  // send back the menu items organized by category
  res.send(allItems);
  await client.end();
}

module.exports = { createMatch };

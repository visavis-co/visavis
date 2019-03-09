const { Client } = require('pg');

async function getStuff(req, res) {
  // connect to db
  const client = new Client();
  await client.connect();

  // get stuff
  const allItems = await client.query('SELECT * FROM stuff');


  // send back the menu items organized by category
  res.send(allItems);
  await client.end();
}


module.exports = { getStuff };
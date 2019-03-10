const { Client } = require('pg');
const { Pool } = require('pg');
const pool = new Pool();

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
pool.connect((err, client, done)=>{
  if (err){
    console.log(err);
  } else {
    console.log('connected');
  }
});

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

async function match(){
  const client = new Client();
  await client.connect();
  const matchableUsers = await client.query('SELECT * FROM users WHERE "matchable"=true');
  if (matchableUsers.rows.length){
    const matchable = new Set();
    for (let i = 0; i < matchableUsers.rows.length; i++){
      matchable.add(i);
    }
    while (matchable.size > 1){
      let remainingItems = Array.from(matchable);
      const choice1 = remainingItems[Math.floor(Math.random()*matchable.size)]
      matchable.delete(choice1);
      remainingItems = Array.from(matchable);
      const choice2 = remainingItems[Math.floor(Math.random()*matchable.size)]
      matchable.delete(choice2);
      const user1 = matchableUsers.rows[choice1];
      const user2 = matchableUsers.rows[choice2];
      if (user1 > user2){
        [user1,user2] = [user2,user1]
      }
      const pair = await client.query('INSERT INTO matches(user1_id, user2_id) values($1, $2)', [user1.id, user2.id]);
      const updateUser = await client.query(`UPDATE users SET "matchable"=false WHERE "id"=${user1.id} OR "id"=${user2.id}`);
      console.log('matching', user1.fullname, 'and', user2.fullname);
    }
    console.log('created all matches');
  }
  client.end();
}

module.exports = { createMatch, match };

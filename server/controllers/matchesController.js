const { Client } = require('pg');
const { Pool } = require('pg');
const pool = new Pool();
const matchController = {};

/***********************************************/
//
// TABLE SCHEMAS
//
// CREATE TABLE matches(
//   id SERIAL PRIMARY KEY,
//   user1_id INTEGER REFERENCES users(id),
//   user2_id INTEGER REFERENCES users(id),
//   dateStarted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   dateCompleted TIMESTAMP,
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

/**
 * getUserMatches - gets user's 1 current match and all past matches that correspond to user id in res.locals.userId
 */
matchController.getUserMatches = async (req, res, next) => {

  // connect to db
  const client = new Client();
  await client.connect();

  // get current match for user res.locals.userId and set prop currentMatch if exists
  // first check where user is user1_id in matches table
  let currentMatch = await client.query('SELECT u.email, u.fullname, u.pictureUrl, m.* FROM matches m JOIN users u ON m.user2_id = u.id WHERE user1_id = $1 AND "dateCompleted" IS NULL', [res.locals.userId]);
  if (currentMatch.rowCount > 0) {
    // found the current match. set the user object in locals.
    res.locals.user.currentMatch = currentMatch.rows[0];
  } else {
    // didn't find current match as user 1. Check if there is a current match as user 2.
    currentMatch = await client.query('SELECT u.email, u.fullname, u.pictureUrl, m.* FROM matches m JOIN users u ON m.user1_id = u.id WHERE user2_id = $1 AND "dateCompleted" IS NULL', [res.locals.userId]);
    if (currentMatch.rowCount > 0) {
      // found the current match. set the user object in locals.
      res.locals.user.currentMatch = currentMatch.rows[0];
    }
  }


  // get past matches for user res.locals.userId and set prop pastMatches if exists
  const pastMatches1 = await client.query('SELECT u.email, u.fullname, u.pictureUrl, m.* FROM matches m JOIN users u ON m.user1_id = u.id WHERE user2_id = $1 AND "dateCompleted" IS NOT NULL', [res.locals.userId]);
  const pastMatches2 = await client.query('SELECT u.email, u.fullname, u.pictureUrl, m.* FROM matches m JOIN users u ON m.user2_id = u.id WHERE user1_id = $1 AND "dateCompleted" IS NOT NULL', [res.locals.userId] );
  let pastMatches = [];

  if(pastMatches1.rowCount > 0 && pastMatches2.rowCount > 0) {
    pastMatches = pastMatches1.rows.concat(pastMatches2.rows);
  } else if (pastMatches1.rowCount > 0) {
    pastMatches = pastMatches1.rows;
  } else if (pastMatches2.rowCount > 0) {
    pastMatches = pastMatches2.rows;
  }

  if (pastMatches.length > 0) res.locals.user.pastMatches = pastMatches;

	console.log('TCL: matchController.getUserMatches -> pastMatches', pastMatches)
  console.log('TCL: userController.getUser -> res.locals.user', res.locals.user);

  // close db connection
  await client.end();

  next();

};

module.exports = matchController;

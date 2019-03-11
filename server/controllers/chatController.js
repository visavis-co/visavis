const { Client } = require('pg');
const chatController = {};

/***********************************************/
//
// CHAT TABLE SCHEMA
//
// CREATE TABLE chats(
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id),
//   match_id INTEGER REFERENCES matches(id),
//   timeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   message Text
// );
//
/***********************************************/

/**
 * sendChatMsg - insert chat message into database
 *
 * @param req - expecting userId, matchId and message as json in body
 *
 */
chatController.sendChatMsg = async (req, res, next) => {
  // connect to db
  const client = new Client();
  await client.connect();

  // get variables from req.body
  const { userId, matchId, message } = req.body;

  // insert new chat msg into database.
  const ret = await client.query(
    'INSERT INTO chats(user_id, match_id, message, timeStamp) VALUES( $1, $2, $3, current_timestamp)',
    [userId, matchId, message]
  );

  // close db connection
  await client.end();
  next();
};


/**
 * getChats - get all the chat messages for matchId
 *
 * @param req - expecting matchId
 *
 */
chatController.getChats = async (req, res, next) => {
  // connect to db
  const client = new Client();
  await client.connect();

  // get variables from req.params
  const { matchId } = req.params;

  // insert new chat msg into database.
  const messages = await client.query(
    'SELECT user_id, match_id, fullname, message, timeStamp FROM chats JOIN users ON user_id = users.id WHERE match_id = $1 ORDER BY timestamp ASC',
    [matchId]
  );

  res.locals.chats = (messages.rowCount > 0) ? messages.rows : [];

  // close db connection
  await client.end();
  next();
};

module.exports = chatController;

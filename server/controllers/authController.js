const authController = {};
const { Client } = require('pg');
const crypto = require('crypto');


/**
 * setSSIDCookie - store the supplied token id (res.locals.userToken) in a cookie
 */
authController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userToken, { maxAge: 900000, httpOnly: true });
	console.log('TCL: authController.setSSIDCookie -> res.locals.userToken', res.locals.userToken)
  next();
};

/**
 * startSession - store the supplied session token id (res.locals.userToken) in the users table
 * TODO: Have sessions in the table expire. (trigger in database to automatically delete sessions?)
 */
authController.startSession = async (req, res, next) => {

  // connect to db
  const client = new Client();
  await client.connect();

  // create unique session token for cookie and session table
  res.locals.userToken = crypto.randomBytes(16).toString('base64');

	console.log('TCL: authController.startSession -> res.locals.userToken, res.locals.userId', res.locals.userToken, res.locals.userId)
  // Insert token Id and user id into sessions table
  await client.query("UPDATE users SET sessionToken = $1 WHERE id = $2", [res.locals.userToken, res.locals.userId]);

  // close db connection
  await client.end();
  next();

};

/**
 * checkLogin - looks for a cookie and sets local variable for userId
 */
authController.checkLogin = async (req, res, next) => {
  if (req.cookies.ssid) {
    // connect to db
    const client = new Client();
    await client.connect();

		console.log('TCL: authController.checkLogin -> req.cookies.ssid', req.cookies.ssid)
    // get user from database that matches res.locals.userId
    const result = await client.query('SELECT * FROM users WHERE sessionToken = $1', [req.cookies.ssid]);
    const user = result.rows[0];

		console.log('TCL: authController.checkLogin -> user', user)

    // close db connection
    await client.end();

    // check for returned user
    if (user) {
      // Found a user. Set res.locals.user and go next
      res.locals.userId = user.id;
      next();
    } else {
      // User not found. end chain
      next(new Error('Session does not exist'));
    }
  } else {
    // User not found. end chain
    next(new Error('Cookie does not exist'));
  }

};

/**
 * logout - deletes session token for user and clears the ssid cookie
 *
 * @param req - expecting userId in body
 */
authController.logout = async (req, res, next) => {
  // connect to db
  const client = new Client();
  await client.connect();

  // get user from database that matches res.locals.userId
  const result = await client.query('UPDATE users SET sessionToken = null WHERE id = $1', [req.body.userId]);

  // clear the ssid cookie
  res.clearCookie('ssid');

  // close db connection
  await client.end();

  res.send('User logged out');
}

module.exports = authController;

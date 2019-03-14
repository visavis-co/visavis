const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const userController = {};
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
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

userController.addPhoto = (req, res, next) => {
  console.log('adding photo');
  // Configure AWS s3 connection
  AWS.config.update({
    // region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // credentials: new AWS.CognitoIdentityCredentials({
      // IdentityPoolId: 'us-east-1:38f72510-f062-48ee-bc5f-d36abc553a38',
    // })
  })
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'vis-a-vis-photo2'}
  });

  // Upload file to S3 Bucket
  let partEmail = req.body.email.split('@')[0];
  let params = {
    Bucket: 'vis-a-vis-photo2',
    // Create unique key here with email + photoname
    Key: `${partEmail}${req.body.id}${req.file.originalname.split('.')[0]}`,
    Body: fs.createReadStream(path.resolve(__dirname, `../../uploads/${req.file.filename}`)),
    ACL: 'public-read'
  }
  s3.upload(params, async (s3err, result) => {
    if (s3err) {
      console.log(s3err)
    } else {
      // Update pictureurl in users table in SQL DB 
      console.log('Upload successful, pic', result.Location);
      const link = result.Location;
      //connect to DB
      const client = new Client();
      await client.connect();
      const dbresult = await client.query(`UPDATE users SET pictureUrl=$1 WHERE email=$2`, [link, req.body.email])
      // res.send(link);
      await client.end();
    }
  })
}
  


userController.changeName = async (req, res, next) => {

  const client = new Client();
  await client.connect();
  console.log('2, inside userController, firing request to db')
  await console.log('req.body', req.body)
  const {id, fullName} = req.body;


  const result = await client.query('UPDATE users SET fullname = $1 WHERE id = $2 ', [fullName, id]);
  const updatedUser = result.rows[0]
  await client.end();
  next();
  
}

userController.changeEmail = async (req, res, next) => {
  const client = new Client();
  await client.connect();
  await console.log('2 client connected - req.body --->', req.body)
  const id = req.body.id;
  const email = req.body.email;

  await client.query('UPDATE users SET email = $1 where id = $2', [email, id])
  await client.end()
  next()
}

userController.changePassword = async (req, res, next) => {
  console.log('userController changepass1 fired')
  const client = new Client(); 

  await client.connect();
  // await client.query('UPDATE users SET password = $1 WHERE id = $2 AND password = $3', [req.body.password, req.body.id, req.body.passwordOld]
  result = await client.query('SELECT * FROM users WHERE id = $1', [req.body.id])
  await client.end()
  console.log('oldpass', req.body.passwordOld)
  console.log('result.rows[0].password', result.rows[0].password)
  if (result) {
    if (bcrypt.compareSync(req.body.passwordOld ,result.rows[0].password) ){
      res.locals.password = req.body.password;
      res.locals.id = req.body.id;
      next()
    }
  else res.status(403).send('wrong password')  
  }

}

userController.changePassword2 = async (req, res, next) => {
  console.log('userController changepass2 fired')
  client = new Client()
  await client.connect()
  let newPass = res.locals.password;
  let id = res.locals.id; 
  console.log('changepassword2 id - newPass', id, newPass)
  
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newPass, salt);
  
  await client.query('UPDATE users SET password = $1 WHERE id = $2', [hash, id])
  await client.end()
  next()
}



module.exports = userController;

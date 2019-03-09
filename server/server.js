// in order to get the .env to work, 
//.env needs to be in the same folder as this file
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const user = require('./controllers/usersController');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// configures a thing that will send emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  //name: process.env.emailName,
  auth: {
    user: process.env.gmailUser,
    pass: process.env.gmailPass
  }
})

// user info format:
//  {
//  fullname: String,
//  email: String
//  }

// Test run! TODO: remove
// mailMatch({fullName: 'tang', email: 'eytang8@gmail.com'},{fullName: 'tang2', email:'eytang8@gmail.com'})

function mailMatch(userA, userB){
  console.log(process.env.gmailPass);
  console.log(`sending email to ${userA.fullName} and ${userB.fullName}`)
  const emailA = {
    from:`"hello@visavis.com" <${process.env.gmailUser}>`,
    to: `${userA.fullName} <${userA.email}>`,
    subject: `${userA.fullName}, you've got a match!`,
    html: `<p>you've been matched! <a href='#'>click to view your match</a></p>`
  }
  const emailB = {
    from:`"hello@visavis.com" <${process.env.gmailUser}>`,
    to: `${userB.fullName} <${userB.email}>`,
    subject: `${userB.fullName}, you've got a match!`,
    html: `<p>you've been matched! <a href='#'>click to view your match</a></p>`
  }
  transporter.sendMail(emailA, (err, info)=>{
    console.log(`sent to ${userA.fullName}`)
    console.log('err', err)
    console.log('info', info)
  })
  transporter.sendMail(emailB, (err, info)=>{
    console.log(`sent to ${userB.fullName}`)
    console.log('err', err)
    console.log('info', info)
  })
}

app.use(bodyParser.json());

/**
 * API - Post to /api/user
 *
 * Expecting { email, fullName, password } to be in request body
 *
 * 1. Create a user in the database, Set res.locals to user id that was just added
 * 2. Create a cookie / session to login the user
 * 3. Make a match for new user if there are any other users that are matchable.
 *
 */

app.post('/api/user', user.createUser, (req, res) => {
  res.send({ newUserId: res.locals.newUserId });
});


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/


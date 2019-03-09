// in order to get the .env to work, 
//.env needs to be in the same folder as this file
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const db = require('./model/db');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// configures a thing that will send emails
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: '587',
  //name: process.env.emailName,
  auth: {
    user: process.env.emailUser,
    pass: process.env.emailPass
  }
})

// user info format:
//  {
//  fullname: String,
//  email: String
//  }

// Test run! TODO: remove
mailMatch({fullName: 'tang', email: 'eytang8@gmail.com'},{fullName: 'tang2', email:'eytang8@gmail.com.'})

function mailMatch(userA, userB){
  console.log(`sending email to ${userA} and ${userB}`)
  const emailA = {
    from:`${process.env.emailName} <test@test.com>`,
    to: `${userA.fullName} <${userA.email}>`,
    subject: `${userA.fullName}, you've got a match!`,
    html: `<p>you've been matched! <a href='#'>click to view your match</a></p>`
  }
  const emailB = {
    from:`${process.env.emailName} <test@test.com>`,
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
 * API - get
 */
app.get('/api/stuff', db.getStuff);


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/



app.use(bodyParser.json());

/**
 * API - get
 */
app.get('/api/stuff', db.getStuff);


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/


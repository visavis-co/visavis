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
//TODO: add in url for our site

function mailMatch(userA, userB){
  console.log(`sending email to ${userA.fullname} and ${userB.fullname}`)
  const emailA = {
    from:`"hello@visavis.com" <${process.env.gmailUser}>`,
    to: `${userA.fullname} <${userA.email}>`,
    subject: `${userA.fullname}, you've got a match!`,
    html: `<p>you've been matched! <a href='#'>click to view your match</a></p>`
  }
  const emailB = {
    from:`"hello@visavis.com" <${process.env.gmailUser}>`,
    to: `${userB.fullname} <${userB.email}>`,
    subject: `${userB.fullname}, you've got a match!`,
    html: `<p>you've been matched! <a href='#'>click to view your match</a></p>`
  }
  transporter.sendMail(emailA, (err, info)=>{
    if(err){
      console.log('err', err)
    } else{
      console.log(`sent to ${userA.fullname}`)
      console.log('info', info)
    }
  })
  transporter.sendMail(emailB, (err, info)=>{
    if(err){
      console.log('err', err)
    } else {
      console.log(`sent to ${userB.fullname}`)
      console.log('info', info)
    }
  })
}

module.exports = {mailMatch} ;

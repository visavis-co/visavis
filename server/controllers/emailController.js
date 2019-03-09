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

module.exports = {mailMatch} ;

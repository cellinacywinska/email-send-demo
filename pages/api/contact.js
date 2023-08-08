export default function (req, res) {
  require('dotenv').config()

  // the transporter object stores all the information on how we want to send our emails
  // what account/provider/port
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      // this is the username and password of the account that we will be sending our emails from.
      auth: {
        user: 'testujeinzynierke@gmail.com',
        pass: process.env.password
      },
      secure: true,
  });

  const mailData = {
    from: 'testujeinzynierke@gmail.com',
    to: 'detnotatka@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }
  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
  res.status(200)
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('dotenv').config()
export default function handler(req, res) {
  const body=JSON.parse(req.body);
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'sjha1828@gmail.com',
      pass: process.env.PASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: 'sjha1828@gmail.com',
    to: body.email,
    subject: `Message From ${body.name}`,
    text: body.message + " | Sent from: " + body.name,
    html: `<div>${body.message}</div><p>Sent from:
    ${body.name} </p>`
  }
  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
  res.status(200).json({ status:'OK' })
}

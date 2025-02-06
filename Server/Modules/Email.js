const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(userEmail, otp) {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `"Job Platform" <${process.env.EMAIL_NODEMAILER}>`, // corrected sender address
      to: userEmail, // list of receivers
      subject: "Verify Your Email With Us", // Subject line
      text: '', // plain text body
      html: `<h1>Your One Time Password is ${otp} and valid for 3 minutes</h1>`, // html body
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = sendEmail;

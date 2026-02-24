const nodemailer = require("nodemailer");

const sendMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Blog App" <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("Email sent");
  } catch (error) {
    console.log("Mail Error:", error.message);
    throw error; 
  }
};

module.exports = sendMail;

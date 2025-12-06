const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

/**
  @param {string} to
  @param {string} subject
  @param {string} text
  @param {string} html        
 */
const sendMail = async (to, subject, text, html = null) => {
  try {
    await transporter.sendMail({
      from: `"Company HR" <${process.env.EMAIL_USER}>`,
      to: `"Company" <${process.env.EMAIL_USER}>` ,
      subject,
      text,
      html: html || text,
    });
    console.log("📧 Mail sent successfully");
  } catch (err) {
    console.error("❌ Error sending mail:", err.message);
  }
};

module.exports = { sendMail };

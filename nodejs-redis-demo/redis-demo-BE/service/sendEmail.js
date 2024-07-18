import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
});

export async function sendEmail(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

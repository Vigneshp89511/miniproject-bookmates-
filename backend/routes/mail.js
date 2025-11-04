 import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const BREVO_SMTP_KEY = process.env.BREVO_SMTP_KEY; // From Brevo dashboard
const BREVO_ID = process.env.BREVO_ID;             // Your Brevo account email

// Use Brevo SMTP — SSL port 465 works on Render
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,               // ✅ Use SSL port for Render
  secure: true,            // ✅ Must be true for port 465
  auth: {
    user: BREVO_ID,
    pass: BREVO_SMTP_KEY,
  },
});

// Verify connection (optional)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Brevo SMTP Verification Error:", error.message);
  } else {
    console.log("✅ Brevo SMTP Connection Verified Successfully");
  }
});

export default transporter;

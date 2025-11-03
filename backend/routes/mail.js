import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config();
const BREVO_SMTP_KEY = process.env.BREVO_SMTP_KEY ;
const RPORT = 2525;
let transporter;

console.log(process.env.BUILD);

if (process.env.BUILD === "development") {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.E_PASS
    },
  });

  transporter.verify((error, success) => {
    console.log(error || success);
  });
}

 

else {
  transporter = nodemailer.createTransport({
    // 1. Set the correct Brevo Hostname
    host: "smtp-relay.brevo.com",
    
    // 2. Use the standard port for TLS (STARTTLS)
    port: {RPORT},
    
    // 3. 'secure' must be false for port 587
    secure: false, 
    
    auth: {
      // Use the account email or API key as the user depending on Brevo setup
      user: process.env.BREVO_ID,
        
      // The 'pass' should be the Brevo SMTP key
      pass: BREVO_SMTP_KEY 
    },
  });

  transporter.verify((error) => {
    // This verification will now test the connection to smtp-relay.brevo.com
    if (error) {
      console.error("Brevo SMTP Verification Error:", error.message);
    } else {
      console.log("Brevo SMTP Connection Verified: Success!");
    }
  });
}
 
export default transporter ;

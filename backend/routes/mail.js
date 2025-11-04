 import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

// ✅ Initialize API clients
const accountApi = new Brevo.AccountApi();
const emailApi = new Brevo.TransactionalEmailsApi();

// ✅ Set authentication key
accountApi.authentications["apiKey"].apiKey = process.env.BREVO_SMTP_KEY;
emailApi.authentications["apiKey"].apiKey = process.env.BREVO_SMTP_KEY;

// ✅ Verify Brevo API connection once on startup
(async () => {
  try {
    const res = await accountApi.getAccount();
    console.log("✅ Brevo Connected Successfully!");
    console.log("Account Info:", res?.data || res);
  } catch (err) {
    console.error("❌ Brevo API Connection Failed:");
    console.error(err.response?.data || err.message);
  }
})();

// ✅ Function to send OTP
export async function sendOtpEmail({ to, name, otp }) {
  try {
    await emailApi.sendTransacEmail({
      sender: { email: process.env.BREVO_ID , name: "BookMates" },
      to: [{ email: to, name }],
      subject: "Your BookMates OTP Code",
      htmlContent: `
         <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your OTP Code</title>
            <style>
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
                body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f6f9fc; }
                .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; }
                .header { padding: 25px 40px; text-align: center; background-color: #4a6ee0; color: white; }
                .content { padding: 30px 40px; color: #333333; line-height: 1.6; }
                .otp-box { background-color: #f1f4ff; border: 2px dashed #4a6ee0; border-radius: 8px; text-align: center; padding: 20px; margin: 20px 0; }
                .otp-code { font-size: 32px; font-weight: bold; color: #4a6ee0; letter-spacing: 5px; }
                .footer { padding: 20px 40px; background-color: #f6f9fc; color: #888888; font-size: 12px; text-align: center; }
                .signature { margin-top: 30px; color: #333; text-align: left; }
                .signature h3 { margin-bottom: 5px; color: #4a6ee0; }
                @media only screen and (max-width: 480px) {
                    .container { width: 100% !important; }
                    .header, .content, .footer { padding-left: 20px !important; padding-right: 20px !important; }
                    .otp-code { font-size: 26px !important; }
                }
            </style>
        </head>
        <body>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f9fc">
                <tr>
                    <td align="center">
                        <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td class="header">
                                    <h1>BookMates Verification</h1>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <h2>Your One-Time Password (OTP)</h2>
                                    <p>Hello ${name},</p>
                                    <p>To verify your identity and continue securely with BookMates, please use the following One-Time Password (OTP):</p>
                                    <div class="otp-box">
                                        <div class="otp-code">${otp}</div>
                                    </div>
                                    <p>This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
                                    <p>If you didn't request this OTP, please ignore this email or contact our support team immediately.</p>
                                    <div class="signature">
                                        <p>Warm regards,</p>
                                        <h3>Vignesh P and Shakthi Vel</h3>
                                        <p>Founders of <strong>BookMates</strong></p>
                                        <p><a href="mailto:founder@bookmates.com">founder@bookmates.com</a></p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    <p>You're receiving this email because you or someone used your email address for verification at BookMates.</p>
                                    <p>&copy; ${new Date().getFullYear()} BookMates. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `,
    });

    console.log("✅ OTP email sent successfully to:", to);
  } catch (err) {
    console.error("❌ Brevo API Send Error:", err.response?.data || err.message);
    throw new Error("Failed to send OTP email");
  }
}

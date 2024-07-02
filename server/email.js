// email.js
import nodemailer from 'nodemailer';

// Function to send confirmation email
export async function sendConfirmationEmail(email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Example: Gmail
    auth: {
      user: 'sabarevason2022@gmail.com', // Your email address
      pass: 'mktbuwlmsgbypjlx' // Your email password or application-specific password
    }
  });

  let mailOptions = {
    from: 'sabarevason2022@gmail.com', // Sender address
    to: email, // Recipient address (user's email from the form)
    subject: 'Donation Confirmation',
     // Subject line
    text: 'Thank you for your donation!'
     // Plain text body
    // You can add HTML content as well if needed: html: '<p>Thank you for your donation!</p>'
  };

  await transporter.sendMail(mailOptions);
  console.log(`Confirmation email sent to ${email}`);
}

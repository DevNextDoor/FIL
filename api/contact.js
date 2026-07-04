import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, project_scope, botcheck } = req.body;

  // 2. Honeypot Security Check: If a bot fills out this hidden field, kill the request instantly
  if (botcheck) {
    return res.status(200).json({ success: true, message: 'Spam detected, ignoring.' });
  }

  // 3. Validation
  if (!name || !email || !project_scope) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 4. Configure Hostinger SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: process.env.HOSTINGER_EMAIL,    // Populated securely from env variables
      pass: process.env.HOSTINGER_PASSWORD, // Populated securely from env variables
    },
  });

  // 5. Construct the Email Layout
  const mailOptions = {
    from: process.env.HOSTINGER_EMAIL, // Must be authenticated Hostinger email address
    to: process.env.HOSTINGER_EMAIL,   // Sending the alert directly to yourself
    replyTo: email,                    // Clicking "Reply" goes directly to the client
    subject: `✨ New Website Lead from ${name} (FIL Website)`,
    text: `You have received a new contact submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nProject Scope:\n${project_scope}`,
  };

  try {
    // 6. Send the email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send email via SMTP' });
  }
}

import nodemailer from 'nodemailer';

const sendMail = async (req, res) => {
  const output = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
      <p style="font-size: 18px; color: #333; margin-bottom: 10px;">You have a message</p>
      
      <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="font-size: 20px; color: #333; margin-bottom: 15px;">Contact Details</h3>
          <p style="font-size: 16px; color: #555; margin-bottom: 8px;"><strong>Name:</strong> ${req.body.fullname}</p>
          <p style="font-size: 16px; color: #555; margin-bottom: 8px;"><strong>Email:</strong> ${req.body.email}</p>
          
          <h3 style="font-size: 20px; color: #333; margin-top: 20px; margin-bottom: 15px;">Message</h3>
          <p style="font-size: 16px; color: #555;">${req.body.message}</p>
      </div>
    </div>
  `;

  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { 
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOption = {
    from: `"${req.body.fullname}" <${req.body.email}>`,
    to: 'smitparekh02@gmail.com',
    subject: 'New Contact Form Submission',
    html: output,
  };

  try {
    await smtpTrans.sendMail(mailOption);
    res.redirect('/success');
  } catch (error) {
    res.send('<h1 style="color:red" > Something Wrong. </h1>');
  }
};

export default {
  sendMail,
};

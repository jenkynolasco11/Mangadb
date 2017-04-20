const nodemailer = require('nodemailer');

require('dotenv').config({silent: true});

const {
  CLIENTID,
  CLIENTSECRET,
  REFRESHTOKEN,
  USER
} = process.env

const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    type : 'OAuth2',
    clientId : CLIENTID,
    clientSecret : CLIENTSECRET,
    refreshToken : REFRESHTOKEN,
    user : USER,
    //accessToken : 'ya29.GlsyBN1jCcvh96yhTbpJbHfaz7fituGL6ONKGyrEwhimhBg0CTYfVJG7vaHKlkdwN3HGvErxJvzLwwP91YVWzM53B_XHMkkxyitlzrt1v9fzJW9H5Hh7rZuE1je3'
  }
});

const sendEmail = exports.sendEmail = (mailOptions, callback) => {
  if(!mailOptions.to || !mailOptions.text)
    return callback('Error on options.', new Error('Error: No text or sender email has been added to options sent.'));

  if(!mailOptions.from)
    mailOptions.from = `${process.env.mainUser} <${process.env.mainEmail}>`; // change this to default email

  if(!mailOptions.subject)
    mailOptions.subject = 'Do not reply - MangaDB'; // change this to default subject

  const verifyMail = (err,success) => {
    if(err) return callback('Error verifying connection to SMTP server', err);

    const send = (err, res) => {
      if(err) return callback('Error', err);

      return callback(null, res); // if it gets here, it means it sent the email successfully
    };

    transporter.sendMail(mailOptions, send);
  };

  transporter.verify(verifyMail);
};

const sendMailNewUser = exports.sendMailNewUser = (user, email, callback) => {
  const mailOptions = {
    to : email,
    subject : 'Welcome to MangaDB!',
    from : `${process.env.mainUser} <${process.env.mainEmail}>`,
    text : `Welcome to MangaDB, ${user}. Welcome!\nYour user is already, successfully registered!!` // change this part with HTML
  };
  sendEmail(mailOptions, callback);
}

sendMailNewUser('jenky', 'jenky_nolasco@1mail.com', console.log)

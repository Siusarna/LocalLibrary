const sgMail = require('@sendgrid/mail');
const config = require('config');

const sendEmail = (userEmail, userFirstName, userLastName, newPassword) => {
  sgMail.setApiKey(config.sendgrid.apiKey);
  const msg = {
    to: userEmail,
    from: 'Local Library <nodejs@example.com>',
    subject: 'Message from Node js',
    text: `Hello,${userLastName} ${userFirstName}.
    Your new password for Local Library site: ${newPassword}`,
  };
  return sgMail.send(msg);
};

module.exports = {
  sendEmail,
};

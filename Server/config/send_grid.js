const sgMail = require ('@sendgrid/mail');
sgMail.setApiKey (process.env.SG_TOKEN);

module.exports.sendMail = async (options, res) => {
  /* This code is a function that sends an email using the SendGrid API. */
  // const {to, subject, html} = options;

  // const msg = {
  //   to: to,
  //   from: 'davedhruv1201@gmail.com',
  //   subject: subject,
  //   html: html,
  // };

  // sgMail
  //   .send (msg)
  //   .then (() => {
  //     console.log ('Email sent');
  //   })
  //   .catch (error => {
  //     res.status(500).send ({
  //       success: false,
  //       message: 'Error sending email',
  //       error: error,
  //     });
  //   });
};

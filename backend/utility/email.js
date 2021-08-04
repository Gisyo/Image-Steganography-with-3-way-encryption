const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = '3wayencrpytion@gmail.com';
  }

  newTransport() {
    if (process.env.NODE_ENV.trim() === 'production') {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '3wayencrpytion@gmail.com',
          pass: 'urstuajzlqrrvlxc'
        }
      });
    }
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    //1)render HTML based on a pud template
    const html = pug.renderFile(
      `${__dirname}/../public/views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );
    //2)Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.fromString(html)
    };

    //3)create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 second'
    );
  }
};

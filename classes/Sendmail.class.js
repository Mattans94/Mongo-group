const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');
const nodemailer = require('nodemailer');

module.exports = class Sendmail {
  constructor(app) {
    app.post('/sendmail', (req, res) => {
      res.json(this.sendConfirmationMail());
    })
  }

  sendConfirmationMail(){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'coffedb@gmail.com',
        pass: 'adminpassword'
      }
    });

    let mailOptions = {
      from: 'coffedb@gmail.com',
      to: 'coffedb@gmail.com',
      subject: 'Bekräftelse på din beställning',
      html: '<h1>Tack för att du valde att köpa ditt kaffe från CoffeeDB!</h1><p><strong>Du har beställt:</strong></p><ul><li>Test1</li><li>Test2</li><li>Test3</li></ul><p style="margin-bottom: 30px;"><strong>Total kostnad:</strong> XX kr</p><p style="margin-bottom: 30px;">Din beräknade leveranstid är 2-3 arbetsdagar.</p><hr><p><em>Har du problem, frågor eller funderingar? Tveka inte att höra av dig till oss på 040 - 12 33 21 eller maila till info@coffeeDB.com.</em></p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}
const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');
const nodemailer = require('nodemailer');

module.exports = class Sendmail {
  constructor(app) {
    app.post('/sendmail', (req, res) => {
      console.log('email:', req.cookies.email);
      res.json(this.sendConfirmationMail((req.cookies.email || req.body.mail), req.body.purchase, req.body.ordernumber));
    })
  }

  sendConfirmationMail(customerEmail, purchase, ordernumber){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'coffedb@gmail.com',
        pass: 'adminpassword'
      }
    });

    // function för att iterera med en for-loop genom arrayen purchase
    // arrayen purchase är this._orderDetails
    function generateLi(purchase) {
      let content = ``;
      for(let i = 0; i < purchase.length; i++) {
        content += `<li>${purchase[i].quantity}x<strong><span style="margin-left: 10px; margin-right: 10px;">${purchase[i].product}</span></strong>${purchase[i].quantity * purchase[i].unitPrice}kr</span></li>`;
      }
      return content;
    }

    function totalPrice(purchase) {
      let price = 0;
      for(let i = 0; i < purchase.length; i++) {
        price += purchase[i].quantity * purchase[i].unitPrice;
      }
      return price;
    }

    let mailOptions = {
      from: 'coffedb@gmail.com',
      to: customerEmail,
      subject: 'Bekräftelse på din beställning',
      html: `<h1 style="background-color: #4fbfa8; color: white; padding: 5px 20px;">Tack för att du valde att köpa ditt kaffe från CoffeeDB!</h1><p><strong style="font-size: 16px;">Du har beställt:</strong></p><ul>${generateLi(purchase)}</ul><p style="padding-top: 8px; font-size: 16px; margin-bottom: 30px; border-top: 2px solid #4fbfa8;"><strong style="margin-right: 5px;">Total kostnad:</strong> ${totalPrice(purchase)} kr</p><p style="margin-bottom: 10px;">Ditt ordernummer är: <em>${ordernumber}</em></p><p style="margin-bottom: 30px;">Din beräknade leveranstid är 2-3 arbetsdagar.</p><hr><p><em>Har du problem, frågor eller funderingar? Tveka inte att höra av dig till oss på 040 - 12 33 21 eller maila till info@coffeeDB.com.</em></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}
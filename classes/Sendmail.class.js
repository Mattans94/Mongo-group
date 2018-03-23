const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coffeeDB');
const db = mongoose.connection;
const app = express();

db.on('error', (e)=>{ console.error(e); });
db.once('open', ()=>{ console.info('db connected in sendmail class');});

const Schema = mongoose.Schema;
const ModelAndRoutes = require('./model-and-routes.class');
const nodemailer = require('nodemailer');
const Order = require('./Order.class');

module.exports = class Sendmail {
  constructor(app, order) {
    app.post('/sendmail', (req, res) => {
      res.json(this.sendConfirmationMail((req.cookies.email || req.body.mail), req.body.purchase, req.body.ordernumber));
    });
    this.order = order;
  }

  async sendConfirmationMail(customerEmail, purchase, ordernumber){
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


    // Get order info
    let orderInfo = await this.order.findOne({orderNumber: ordernumber});
    console.log('Order', orderInfo);
    this.orderTotal = orderInfo.total;
    this.shippingMethod = orderInfo.shippingMethod;
    this.paymentMethod = orderInfo.paymentMethod.toUpperCase();
    this.firstName = orderInfo.firstName;
    this.lastName = orderInfo.lastName;
    this.street = orderInfo.street;
    this.zip = orderInfo.zip;
    this.ort = orderInfo.ort;
    if(orderInfo.cardNumber){
      this.cardNumber = orderInfo.cardNumber.toString().replace(/\d(?=\d{4})/g, '#');
    }



    let mailOptions = {
      from: 'coffedb@gmail.com',
      to: customerEmail,
      subject: 'Bekräftelse på din beställning',
      html: `<h1 style="background-color: #4fbfa8; color: white; padding: 5px 20px;">Hej ${this.firstName}! Tack för att du valt att köpa ditt kaffe hos oss!</h1>
      <p><strong style="font-size: 16px;">Du har beställt:</strong></p>
      <ul>${generateLi(purchase)}</ul>
      <p style="padding-top: 8px; font-size: 16px; margin-bottom: 30px; border-top: 2px solid #4fbfa8;"><strong style="margin-right: 5px;">Total kostnad:</strong> ${this.orderTotal} kr</p>
      <strong style="margin-right: 5px;">Betalningsmetod: ${this.paymentMethod}<br></strong>
      <strong style="margin-right: 5px; ${this.paymentMethod != 'CREDIT-CARD' ? 'display: none;"' : '"'}>Kortnummer: ${this.cardNumber}</strong>
      <p style="margin-bottom: 10px;">Ditt ordernummer är: <em>${ordernumber}</em></p>
      <h2>Leveransinformation</h2>
      <ul>
        <li>${this.firstName} ${this.lastName}</li>
        <li>${this.street}</li>
        <li>${this.zip}, ${this.ort}</li>
      </ul>
      <p style="margin-bottom: 30px;">Din beräknade leveranstid är 2-3 arbetsdagar.</p><hr><p><em>Har du problem, frågor eller funderingar? Tveka inte att höra av dig till oss på 040 - 12 33 21 eller maila till info@coffeeDB.com.</em></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}

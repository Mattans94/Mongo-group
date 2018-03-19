const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flexjson = require('jsonflex')();
const session = require('./classes/session.js');
const nodemailer = require('nodemailer');
const Schema = mongoose.Schema;
const app = express();


app.use(bodyParser.json()) // needed to post json
app.use(express.static('www'));
app.use(flexjson);
app.use(cookieParser()); // needed to read and set cookies
app.use(session);



const Product = require('./classes/Product.class');
const Tool = require('./classes/Tool.class');
const Order = require('./classes/Order.class');
const User = require('./classes/User.class');
const Cart = require('./classes/Cart.class');
const OrderDetails = require('./classes/OrderDetails.class');
const product = new Product(app);
const tool = new Tool(app);
const order = new Order(app);
const user = new User(app);
const cart = new Cart(app);
const orderDetails = new OrderDetails(app);


// Move to appropriate class
// Enter real values (sender, reciever, bought objects etc.)
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

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//       return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);
// });


// Serve index.html if req has no file extension.
// (to work with SPA)
app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});




app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

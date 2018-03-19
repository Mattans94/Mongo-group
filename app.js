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
// app.use(nodemailer);


const Product = require('./classes/Product.class');
const Tool = require('./classes/Tool.class');
const Order = require('./classes/Order.class');
const User = require('./classes/User.class');
const Cart = require('./classes/Cart.class');
const product = new Product(app);
const tool = new Tool(app);
const order = new Order(app);
const user=new User(app);
const cart = new Cart(app);


// app.get('/getVisa', (req,res)=>{
//   res.send(JSON.stringify({
//     card: 1234567,
//     year: 2018,
//     month: 02,
//     security: 123
//   }));
// });

// Move to appropriate class
// Enter real values (sender, reciever, bought objects etc.)
// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//     console.error('Failed to create a testing account. ' + err.message);
//       return process.exit(1);
//   }
  
  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false,
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
    // text: 'Plaintext version of the message',
    html: '<h1>Tack för att du valde att köpa ditt kaffe från CoffeeDB!</h1>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
// });


// Serve index.html if req has no file extension.
// (to work with SPA)
app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});




app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

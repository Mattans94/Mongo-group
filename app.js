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
app.use(session.sessionFn);



const Product = require('./classes/Product.class');
const Tool = require('./classes/Tool.class');
const Order = require('./classes/Order.class');
const User = require('./classes/User.class');
const Cart = require('./classes/Cart.class');
const OrderDetails = require('./classes/OrderDetails.class');
const Sendmail = require('./classes/Sendmail.class');
const product = new Product(app);
const tool = new Tool(app);
const order = new Order(app);
const user = new User(app);
const cart = new Cart(app);
const orderDetails = new OrderDetails(app);
const sendmail = new Sendmail(app);


app.get('/getLogin', (req, res) => {
  //const Session = mongoose.model('Session', session.schema);
  let query = session.schema.findOne({ _id: req.cookies.session });
  query.select('_id loggedIn data');
  query.exec(function (err, data) {
    if (err) {
      res.json(JSON.stringify(err));
      return;
    }
    if (!data || !data.data || !data.data.user) {
      res.json({
        isLogin: false
      })
      return;
    }
    res.json({
      isLogin: true,
      user: data.data.user.name,
      role: data.data.user.role,
      email: data.data.user.email
    })
  }

  )

});

// Serve index.html if req has no file extension.
// (to work with SPA)
app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});





app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

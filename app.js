const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flexjson = require('jsonflex')();
const session = require('./classes/session.js');
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




// Serve index.html if req has no file extension.
// (to work with SPA)
app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});




app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

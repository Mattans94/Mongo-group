const express = require('express');
const bodyParser = require('body-parser');
const flexjson = require('jsonflex')();
const app = express();

app.use(bodyParser.json()) // needed to post json
app.use(express.static('www'));
app.use(flexjson);

const Bean = require('./classes/Bean.class');
const Powder = require('./classes/Powder.class');
const Capsule = require('./classes/Capsule.class');
const Tool = require('./classes/Tool.class');
const Cart = require('./classes/Cart.class');
const Profile = require('./classes/Profile.class');
const Order = require('./classes/Order.class');

const bean = new Bean(app);
const powder = new Powder(app);
const capsule = new Capsule(app);
const tool = new Tool(app);
const cart = new Cart(app);
const profile = new Profile(app);
const order = new Order(app);

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

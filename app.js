const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()) // needed to post json
app.use(express.static('www'));

const Bean = require('./classes/Bean.class');
const Powder = require('./classes/Powder.class');
const Capsule = require('./classes/Capsule.class');
const Tool = require('./classes/Tool.class');
const bean = new Bean(app);
const powder = new Powder(app);
const capsule = new Capsule(app);
const tool = new Tool(app);


// Serve index.html if req has no file extension.
// (to work with SPA)
app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + './www/index.html');
});


app.listen(3000,()=>{
  console.log("Listening on port 3000!");
});

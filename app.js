const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()) // needed to post json
app.use(express.static('www'));
app.listen(3000,()=>{
  console.log("Listening on port 3000!");
});

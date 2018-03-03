const beansJson = require('./beans.json');
const powderJson = require('./powders.json');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/coffeeDB');
const db = mongoose.connection;
db.on('error', (e) => {
  console.error(e);
});
db.once('open', () => {
  console.info('db connected');
});

const Bean = require('./classes/Bean.class');
const Powder = require('./classes/Powder.class');
const beanModel = new Bean(app).myModel;
const powderModel = new Powder(app).myModel;

// Empty collentions
beanModel.remove({}, async () => {
  await saveBean();
});

powderModel.remove({}, async () => {
  await savePowder();
  // process.exit();
});

const saveBean = () => {
  beansJson.forEach((item) => {
    const bean = new beanModel(item);
    bean.save();
    console.log("beans saved");
  });
}

const savePowder = () => {
  powderJson.forEach((item) => {
    const powder = new powderModel(item);
    powder.save();
    console.log("powder saved");
  });
}

const beansJson = require('./beans.json');
const powdersJson = require('./powders.json');
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
  await save(beansJson, 'bean');
});

powderModel.remove({}, async () => {
  await save(powdersJson, 'powder');
  // process.exit();
});

const save = (json, modelName) => {
  json.forEach((item) => {
    switch (modelName) {
      case 'bean':
        new beanModel(item).save();
        console.log("beans saved");
        break;
      case 'powder':
        new powderModel(item).save();
        console.log("powder saved");
        break;
      default:
        break;
    }
  });
}

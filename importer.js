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

const models = {
  'bean': beanModel,
  'powder': powderModel
}

const save = (json, modelName) => {
  json.forEach((item, index) => {
    new models[modelName](item).save();
    console.log(`${modelName} ${index + 1} saved`);
  });
}

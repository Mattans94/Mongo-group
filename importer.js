const beansJson = require('./beans.json');
const powdersJson = require('./powders.json');
const capsulesJson = require('./capsules.json');
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
const Capsule = require('./classes/Capsule.class');
const beanModel = new Bean(app).myModel;
const powderModel = new Powder(app).myModel;
const capsuleModel = new Capsule(app).myModel;

const models = {
  'bean': beanModel,
  'powder': powderModel,
  'capsule': capsuleModel
}

const save = (json, modelName) => {
  json.forEach((item, index) => {
    new models[modelName](item).save();
    console.log(`${modelName} ${index + 1} saved`);
  });
}

beanModel.remove({}, async () => {
  await save(beansJson, 'bean');
})
.then(
  powderModel.remove({}, async () => {
    await save(powdersJson, 'powder');
  }))
.then(() => {
  process.exit();
});
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

const save = (json, modelName, extraKey = null) => {
  json.forEach((item, index) => {
    if (extraKey) {
      for(const key in extraKey) {
        item[key] = extraKey[key];
      }
    }

    new models[modelName](item).save((err) => {
      if (err) {
        console.log(`${index} is not saved!!`);
      } else {
        console.log(`${index} is saved.`);
      }
    });
  });
}

const saveModels = async () => {
  await beanModel.remove({}, () => {
    save(beansJson, 'bean');
  });
  await powderModel.remove({}, () => {
    save(powdersJson, 'powder');
  });
  await capsuleModel.remove({}, () => {
    save(capsulesJson, 'capsule', {'tools': []});
  })
}

saveModels();
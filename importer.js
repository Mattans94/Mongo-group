const beansJson = require('./beans.json');
const powdersJson = require('./powders.json');
const capsulesJson = require('./capsules.json');
const toolsJson = require('./tools.json');
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
const Tool = require('./classes/Tool.class');

const beanModel = new Bean(app).myModel;
const powderModel = new Powder(app).myModel;
const capsuleModel = new Capsule(app).myModel;
const toolModel = new Tool(app).myModel;

const models = {
  'bean': beanModel,
  'powder': powderModel,
  'capsule': capsuleModel,
  'tool': toolModel
}

const save = (json, modelName, extraKey = null) => {
  const savedObjects = [];
  json.forEach((item, index) => {
    if (extraKey) {
      for(const key in extraKey) {
        item[key] = extraKey[key];
      }
    }

    const model = new models[modelName](item);
    model.save((err, item) => {
      if (err) {
        console.log(`${modelName} ${index + 1} is not saved!!`);
      } else {
        console.log(`${modelName} ${index + 1} is saved.`);
      }
    });
    savedObjects.push(model);
  });
  return savedObjects;
}
}

const saveModels = async () => {
  await beanModel.remove({}, () => {
    save(beansJson, 'bean');
  });
  await powderModel.remove({}, () => {
    save(powdersJson, 'powder');
  });
  let savedCapsules;
  await capsuleModel.remove({}, () => {
    savedCapsules = save(capsulesJson, 'capsule', {'tools': []});
  });
  await toolModel.remove({}, () => {
    save(toolsJson, 'tool', {'capsules': []});
  })

//  process.exit();
}

saveModels();
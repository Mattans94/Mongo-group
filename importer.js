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

const save = async (json, modelName, extraKey = null) => {
  const savedObjects = [];

  for (const item of json) {
    if (extraKey) {
      for(const key in extraKey) {
        item[key] = extraKey[key];
      }
    }

    const model = new models[modelName](item);
    await model.save().then(item => {
      console.log(`${modelName} ${item.name} is saved.`);
    });

    savedObjects.push(model);
  }

  return savedObjects;
}

const capsuleUpdate = async (savedCapsules, savedTools) => {
  for (const capsule of savedCapsules) {
    capsule.types.forEach(type => {
      const sameTypeTools = savedTools.filter(tool => tool.type === type);
      sameTypeTools.forEach(tool => {
        capsule.tools.push(tool._id);
      });
    });
    await capsule.save().then(item => {
      console.log(`capsule ${item.name} is updated!!!!`);
    });
  };
}

const toolUpdate = async (savedCapsules, savedTools) => {
  for (const tool of savedTools) {
    savedCapsules.forEach(capsule => {
      capsule.types.forEach(type => {
        if (type === tool.type) {
          tool.capsules.push(capsule._id);
        }
      });
    });
    await tool.save().then(item => {
      console.log(`tool ${item.name} is updated!!!!!!`);
    });
  };
}

const saveModels = () => {
  beanModel.remove({}, () => {
    save(beansJson, 'bean');
  });
  powderModel.remove({}, () => {
    save(powdersJson, 'powder');
  });

  let savedCapsules;
  let savedTools;

  capsuleModel.remove({}, () => {
    toolModel.remove({}, async () => {
      await save(capsulesJson, 'capsule', {'tools': []})
      .then(obj => {
        savedCapsules = obj;
      });

      await save(toolsJson, 'tool', {'capsules': []})
      .then(obj => {
        savedTools = obj;
      });

      await capsuleUpdate(savedCapsules, savedTools);
      await toolUpdate(savedCapsules, savedTools);
      process.exit();
    });
  });
}

saveModels();
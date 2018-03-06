const beansJson = require('./beans.json');
const powdersJson = require('./powders.json');
const capsulesJson = require('./capsules.json');
const toolsJson = require('./tools.json');
const profileJson = require('./profile.json');//login information and orders
const orderJson = require('./order.json');//all orders
const cartJson = require('./cart.json');//shopping cart storage. still remain after refresh
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
const Cart = require('./classes/CartAPI.class');
const Order = require('./classes/OrderAPI.class');
const Profile = require('/classes/ProfileAPI.class');

const beanModel = new Bean(app).myModel;
const powderModel = new Powder(app).myModel;
const capsuleModel = new Capsule(app).myModel;
const toolModel = new Tool(app).myModel;
const cartModel = new Cart(app).myModel;
const orderModel = new Order(app).myModel;
const profileModel = new Profile(app).myModel;

const models = {
  'bean': beanModel,
  'powder': powderModel,
  'capsule': capsuleModel,
  'tool': toolModel,
  'cart':cartModel,
  'order':orderModel,
  'profile':profileModel
}

const save = (json, modelName, extraKey = null) => {
  const savedObjects = [];
  json.forEach((item, index) => {
    if (extraKey) {
      for (const key in extraKey) {
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

const capsuleUpdate = (savedCapsules, savedTools) => {
  savedCapsules.forEach(capsule => {
    capsule.types.forEach(type => {
      const sameTypeTools = savedTools.filter(tool => tool.type === type);
      sameTypeTools.forEach(tool => {
        capsule.tools.push(tool._id);
      });
    });
    capsule.save();
  });
}

const toolUpdate = (savedCapsules, savedTools) => {
  savedTools.forEach(tool => {
    savedCapsules.forEach(capsule => {
      capsule.types.forEach(type => {
        if (type === tool.type) {
          tool.capsules.push(capsule._id);
        }
      });
    });
    tool.save();
  });
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
    savedCapsules = save(capsulesJson, 'capsule', { 'tools': [] });
  });
  let savedTools;
  await toolModel.remove({}, () => {
    savedTools = save(toolsJson, 'tool', { 'capsules': [] });
  })
  // fix it later
  setTimeout(() => {
    capsuleUpdate(savedCapsules, savedTools);
    toolUpdate(savedCapsules, savedTools);
  }, 1000);
  //  process.exit();
}

saveModels();
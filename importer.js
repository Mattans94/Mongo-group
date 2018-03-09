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
const Cart = require('./classes/Cart.class');
const Order = require('./classes/Order.class');
const Profile = require('./classes/Profile.class');

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

// Save json files into mongoDB.
// ExtraKey is set when that key is not exist in json file, but exist in schema
const save = async (json, modelName, extraKey = null) => {
  const savedObjects = [];

  for (const item of json) {
    if (extraKey) {
      for (const key in extraKey) {
        item[key] = extraKey[key];
      }
    }

    // Create one of the models specified in models object
    // (beanModel, powderModel, capsuleModel, toolModel)
    const model = new models[modelName](item);
    await model.save().then(item => {
      console.log(`${modelName} ${item.name} is saved.`);
    });

    savedObjects.push(model);
  }

  // Use this for updating capsule and tool data later
  return savedObjects;
}

// Fillin capsule.tools by toolModel, judged by the type in both capsule and tool
const capsuleUpdate = async (savedCapsules, savedTools) => {
  for (const capsule of savedCapsules) {
    capsule.types.forEach(type => {
      const sameTypeTools = savedTools.filter(tool => tool.type === type);
      sameTypeTools.forEach(tool => {
        capsule.tools.push(tool._id);
      });
    });
    await capsule.save().then(item => {
      console.log(`capsule ${item.name} is updated!`);
    });
  };
}

// Fillin tool.capsules by capsuleModel, judged by the type in both capsule and tool
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
      console.log(`tool ${item.name} is updated!`);
    });
  };
}

// Fillin cart.profiles by toolModel, judged by the type in both capsule and tool
const cartUpdate = async (savedCarts, savedProfiles) => {
  for (const cart of savedCarts) {
    cart.emails.forEach(email => {
      const sameEmailProfiles = savedProfiles.filter(profile => profile.email === email);
      sameEmailProfiles.forEach(profile => {
        cart.profiles.push(profile._id);
      });
    });
    await cart.save().then(item => {
      console.log(`cart ${item.product} is updated!`);
    });
  };
}

const profileUpdate = async (savedProfiles, savedCarts) => {
  for (const profile of savedProfiles) {
    savedCarts.forEach(cart => {
      cart.emails.forEach(email => {
        if (email === profile.email) {
          profile.cart.push(cart._id);
        }
      });
    });
    await tool.save().then(item => {
      console.log(`tool ${item.name} is updated!`);
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
  orderModel.remove({}, () => {
    save(orderJson, 'order');
  });

  let savedCapsules;
  let savedTools;
  let savedCarts;
  let savedProfiles;

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

      // Capsules json and tools json should be saved before updating
      await capsuleUpdate(savedCapsules, savedTools);
      await toolUpdate(savedCapsules, savedTools);
      process.exit();
    });
  });

  cartModel.remove({}, () => {
    profileModel.remove({}, async () => {
      let profile;
      let cart;
      await save(profileJson, 'profile', {'cart':[]})
      .then(obj => {
        savedProfiles = obj;
      });
      await save(cartJson, 'cart',{'profile':[]})
      .then(obj => {
        savedCarts = obj;
        });    
      // profile[0].cart.push(cart[0]._id);
      // cart[0].profile.push(profile[0]._id);
      // await profile[0].save();
      // await cart[0].save();
      await cartUpdate(savedCarts, savedProfiles);
      await profileUpdate(savedProfiles, savedCarts);
      process.exit();
    });
  });
}

saveModels();
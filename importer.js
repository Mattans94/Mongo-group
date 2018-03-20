const beansJson = require('./beans.json');
const powdersJson = require('./powders.json');
const capsulesJson = require('./capsules.json');
const toolsJson = require('./tools.json');
const usersJson = require('./users.json');
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

const Product = require('./classes/Product.class');
const Tool = require('./classes/Tool.class');
const User = require('./classes/User.class');

const productModel = new Product(app).myModel;
const toolModel = new Tool(app).myModel;
const userModel = new User(app).myModel;

const models = {
  'product': productModel,
  'tool': toolModel,
  'user': userModel
}

// Save product's json files into mongoDB.
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
    // (productModel, toolModel)
    const model = new models[modelName](item);
    await model.save().then(item => {
      console.log(`${modelName} ${item.name} is saved.`);
    });

    savedObjects.push(model);
  }

  // Use this for updating product and tool data later
  return savedObjects;
}

// Fillin product.tools by toolModel, judged by the type in both product and tool
const productUpdate = async (savedProducts, savedTools) => {
  for (const savedProduct of savedProducts) {
    const matchedTypeTools = savedTools.filter(savedTool => savedTool.connectType === savedProduct.connectType);
    matchedTypeTools.forEach(tool => {
      savedProduct.tools.push(tool._id);
    });
    await savedProduct.save().then(item => {
      console.log(`product ${item.name} is updated!`);
    });
  };
}

// Fillin tool.capsules by productModel, judged by the type in both product and tool
const toolUpdate = async (savedProducts, savedTools) => {
  for (const savedTool of savedTools) {
    const matchedTypeProducts = savedProducts.filter(savedProduct => savedProduct.connectType === savedTool.connectType);
    matchedTypeProducts.forEach(product => {
      savedTool.capsules.push(product._id);
    });
    await savedTool.save().then(item => {
      console.log(`tool ${item.name} is updated!`);
    });
  };
}

const saveModels = () => {
  // Gather all objects of three json files
  const productsJson = [];
  beansJson.forEach(bean => { productsJson.push(bean); });
  powdersJson.forEach(powder => { productsJson.push(powder); });
  capsulesJson.forEach(capsule => { productsJson.push(capsule); });

  let savedProducts;
  let savedTools;

  productModel.remove({}, () => {
    toolModel.remove({}, async () => {
      await save(productsJson, 'product', { 'tools': [] })
        .then(obj => {
          savedProducts = obj;
        });

      await save(toolsJson, 'tool', { 'capsules': [] })
        .then(obj => {
          savedTools = obj;
        });

      // Capsules json and tools json should be saved before updating
      await productUpdate(savedProducts, savedTools);
      await toolUpdate(savedProducts, savedTools);
     // process.exit();
    });
  });

  userModel.remove({}, async () => {
    let userList = await save(usersJson, 'user');
    console.log(userList);
  });

}

saveModels();

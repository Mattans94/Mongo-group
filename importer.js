const beansJson = require('./beans.json');
const powdersJson = require('./powders.json');
const capsulesJson = require('./capsules.json');
const toolsJson = require('./tools.json');
const profileJson = require('./profile.json');//login information and orders
const orderJson = require('./order.json');//all orders
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
const Cart = require('./classes/Cart.class');
const Order = require('./classes/Order.class');
const Profile = require('./classes/Profile.class');

const productModel = new Product(app).myModel;
const toolModel = new Tool(app).myModel;
const cartModel = new Cart(app).myModel;
const orderModel = new Order(app).myModel;
const profileModel = new Profile(app).myModel;

const models = {
  'product': productModel,
  'tool': toolModel,
  'order': orderModel,
  'profile': profileModel
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
    })
  }
}

// Fillin order.profiles by toolModel, judged by the type in both capsule and tool
// const orderUpdate = async (savedOrders, savedProfiles) => {
//   for (const order of savedOrders) {
//     order.emails.forEach(email => {
//       const sameEmailProfiles = savedProfiles.filter(profile => profile.email === email);
//       sameEmailProfiles.forEach(profile => {
//         order.profiles.push(profile._id);
//       });
//     });
//     await order.save().then(item => {
//       console.log(`order ${item.product} is updated!`);
//     });
//   };
// }

const orderUpdate = async (savedProfiles, savedOrders) => {
  // for (const profile of savedProfiles) {
  //   savedOrders.forEach(order => {
  //     order.emails.forEach(email => {
  //       if (email === profile.email) {
  //         profile.order.push(order._id);
  //       }
  //     });
  //   });

  console.log("here I am!");
  savedOrders[0].profile.push(savedProfiles[0]._id);
  console.log("savedOrders[0]"+savedOrders[0]);
  await savedOrders[0].save();
  // await profile.save().then(item => {
   console.log(`profile is updated!`);
  // });
  // };
}


const saveModels = () => {
  // Gather all objects of three json files
  const productsJson = [];
  beansJson.forEach(bean => { productsJson.push(bean); });
  powdersJson.forEach(powder => { productsJson.push(powder); });
  capsulesJson.forEach(capsule => { productsJson.push(capsule); });

  let savedProducts;
  let savedTools;
  let savedOrders;
  let savedProfiles;

  productModel.remove({}, () => {
    toolModel.remove({}, async () => {
      await save(productsJson, 'product', {
        'tools': []
      })
        .then(obj => {
          savedProducts = obj;
        });

      await save(toolsJson, 'tool', {
        'capsules': []
      })
        .then(obj => {
          savedTools = obj;
        });

      // Capsules json and tools json should be saved before updating
      await productUpdate(savedProducts, savedTools);
      await toolUpdate(savedProducts, savedTools);
      process.exit();
    });
  });

  orderModel.remove({}, () => {
    profileModel.remove({}, async () => {
      let profile;
      let order;
      await save(profileJson, 'profile', { 'order': [] })
        .then(obj => {
          savedProfiles = obj;
        });
      await save(orderJson, 'order', { 'profile': [] })
        .then(obj => {
          savedOrders = obj;
        });
      // profile[0].cart.push(cart[0]._id);
      // cart[0].profile.push(profile[0]._id);
      // await profile[0].save();
      // await cart[0].save();
      await orderUpdate(savedProfiles, savedOrders);
      // await profileUpdate(savedProfiles, savedOrders);
      process.exit();
    });
  });
}

saveModels();
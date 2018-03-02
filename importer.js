const kaffeJson = require('./kaffe.json');
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

// Empty collentions
beanModel.remove({}, () => {
  powderModel.remove({}, () => {
    capsuleModel.remove({}, () => {
      toolModel.remove({}, async () => {
        await start();
        process.exit();
      });
    });
  });
});

const start = () => {

  const bean = new beanModel;
  bean.save();
  const powder = new powderModel;
  powder.save();
  const capsule = new capsuleModel;
  capsule.save();
  const tool = new toolModel;
  tool.save();

}
const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Powder extends ModelAndRoutes {

  static get schema() {
    return {
      name: String,
      image: String,
      description: String,
      price: Number,
      quantity: Number,
      type: String
    }
  }

}
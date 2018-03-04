const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Tool extends ModelAndRoutes {

  static get schema() {
    return {
      name: String,
      image: String,
      description: String,
      price: Number,
      quantity: Number,
      flavor: String,
      countryOfOrigin: String,
      type: Number,
      capsules: [{
        type: Schema.Types.ObjectId,
        ref: 'Capsule'
      }]
    }
  }

}
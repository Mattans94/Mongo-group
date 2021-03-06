const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Tool extends ModelAndRoutes {

  static get schema() {
    return {
      name: String,
      image: String,
      type: String,
      connectType: Number,
      capsules: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }]
    }
  }

}
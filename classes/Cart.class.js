//get products in cart
//delete products
//update quantity
//add products in cart
const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Cart extends ModelAndRoutes {

    static get schema() {
        return {
            product: {
              type:Schema.Types.ObjectId,
              required: true
            },
            quantity: {
              type: Number,
              default: 1
            },
            sessionId: String
        }
    }

}

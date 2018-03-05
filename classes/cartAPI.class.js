//get products in cart
//delete products
//update quantity
//add products in cart
const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class CartAPI extends ModelAndRoutes {

    static get schema() {
        return {
            product: String,
            img:String,
            quantity: Number,
            unitPrice: String,
            total: Number,
        }
    }

}
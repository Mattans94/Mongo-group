const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class OrderDetail extends ModelAndRoutes {

    static get schema() {
        return {
            product: String,
            quantity: Number,
            unitPrice: Number
        }
    }
}
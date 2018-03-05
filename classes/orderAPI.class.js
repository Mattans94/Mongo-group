const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class OrderAPI extends ModelAndRoutes {

    static get schema() {
        return {
            product: String,
            img:String,
            quantity: Number,
            unitPrice: String,
            total: Number,
            vat: Number,
            shippingMethod:String,
            shippingFee:Number,
            paymentMethod:String,
            cardNumber: Number,
            cardMonth:Number,
            cardYear:Number,
            cvCode:Number,
            profile: [{
                type: Schema.Types.ObjectId,
                ref: 'profile'
            }]
        }
    }

}
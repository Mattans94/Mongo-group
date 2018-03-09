const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Order extends ModelAndRoutes {

    static get schema() {
        return {
            orderNumber:Number, //change back to orderNumber later
            product: String,
            quantity: Number,
            unitPrice: Number,
            total: Number,
            vat: Number,
            shippingMethod:String,
            shippingFee:Number,
            paymentMethod:String,
            cardNumber: Number,
            cardMonth:String,
            cardYear:Number,
            cvCode:Number
            // profile: [{
            //     type: Schema.Types.ObjectId,
            //     ref: 'profile'
            // }]
        }
    }

}
const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Order extends ModelAndRoutes {

    static get schema() {
        return {
            orderNumber: Number, //change back to orderNumber later
            orderDetails: [{
                type: Schema.Types.ObjectId,
                ref: 'OrderDetail'
            }],
            orderTime: Date,
            firstName: String,
            lastName: String,
            street: String,
            zip: Number,
            region: String,
            phoneNumber: Number,
            deliveryMethod: String,
            deliveryFee: Number,
            paymentMethod: String,
            cardNumber: Number,
            cardMonth: String,
            cardYear: Number,
            cvCode: Number,
            total: Number,
            productVAT: Number,
            deliveryVAT: Number,
            profile: [{
                type: Schema.Types.ObjectId,
                ref: 'Profile'
            }]
        }
    }

}


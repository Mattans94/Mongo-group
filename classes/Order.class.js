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
            status: String,
            ort: String,
            user: String
        }
    }

    constructor(expressApp) {
        super(expressApp);

        expressApp.get('/getLastOrder', (req, res) => {
            let query = this.myModel.find().sort({ _id: -1 }).limit(1);
            query.exec((err, lastOrder) => {
                
                req.session.data.order = lastOrder;
                req.session.markModified('data');
                req.session.save();
                res.cookie('street', lastOrder[0].street);
                res.json({
                    result: lastOrder
                });
                //set more infomation to cookies
            });
        });
    }
}


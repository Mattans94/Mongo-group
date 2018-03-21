const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Order extends ModelAndRoutes {

    static get schema() {
        return {
            orderNumber: Number, //change back to orderNumber later
            orderDetails: Schema.Types.Mixed,
            orderTime: Date,
            firstName: String,
            lastName: String,
            street: String,
            zip: Number,
            region: String,
            phoneNumber: Number,
            shippingMethod: String,
            shippingFee: Number,
            shippingVAT: Number,
            paymentMethod: String,
            cardNumber: Number,
            cardMonth: String,
            cardYear: Number,
            cvCode: Number,
            total: Number,
            productVAT: Number,
            status: String,
            ort: String,
            user: String,
            quantity: Number,
            email: String
        }
    }

    constructor(expressApp) {
        super(expressApp);

        expressApp.get('/getLastOrder', (req, res) => {
            let user = req.cookies.user;

            if (!user) {
                res.json({
                    result: []
                });

                return;
            }

            let query = this.myModel.find({ user: user }).sort({ _id: -1 }).limit(1);
            query.exec((err, lastOrder) => {
                
                req.session.data.order = lastOrder;
                req.session.markModified('data');
                req.session.save();
                res.json({
                    result: lastOrder
                });
            });
        });
    }
}


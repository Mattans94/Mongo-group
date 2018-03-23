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
            zip:  String,
            region: String,
            phoneNumber:  String,
            shippingMethod: String,
            shippingFee:  String,
            shippingVAT: String,
            paymentMethod: String,
            cardNumber: String,
            cardMonth: String,
            cardYear: String,
            cvCode: String,
            total: String,
            productVAT: String,
            status: String,
            ort: String,
            user: String,
            quantity: String,
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


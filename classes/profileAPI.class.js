//sign up user
//login user
//address management
const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class ProfileAPI extends ModelAndRoutes {

    static get schema() {
        return {
            userName: String,
            email: String,
            password: String,
            firstName: String,
            lastName: String,
            street: String,
            zip: Number,
            country: String,
            telephone: Number,
            order:[
                {
                    type:Schema.Types.ObjectID,
                    ref:'order'
                }
            ]
        }
    }

}
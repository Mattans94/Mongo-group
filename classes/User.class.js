const qs = require('qs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/coffeeDB');
const db = mongoose.connection;
db.on('error', (e) => { console.error(e); });
db.once('open', () => { console.info('db connected'); });

module.exports = class User {

    static get schema() {
        return {
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            name: { type: String, required: true }
        }
    }
    constructor(expressApp) {
        const schema = new mongoose.Schema(this.constructor.schema);
        const myModel = mongoose.model('User', schema);
        this.loginRoute();
        this.logoutRoute();
        this.registerRoute();
    }

    registerRoute() {
        this.expressApp.post('/register', (req, res) => {
            //Success, save the user into db
            const entity = new myModel(req.body);
            entity.save(() => {
                // Newly created and saved Mongoose object
                // with  _id and __v properties
                res.json(entity);
            });
        });
    }


    loginRoute() {
        this.expressApp.post('/login', (req, res) => {
            
            let query = myModel.findOne({ "email": req.body.email });
            console.log("query " + query);
            query.select('email password name');
            query.exec(function (err, person) {
                if (err) {
                    res.json(JSON.stringify(err));
                    return;
                }
                if (person.password == req.body.password) {
                    res.json({ result: person.name });
                } else {
                    res.json({ result: 'Login fail!' });
                }

            });
        });
    }

}




const qs = require('qs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/coffeeDB');
const db = mongoose.connection;
db.on('error', (e) => { console.error(e); });
db.once('open', () => { console.info('db connected'); });

module.exports = class User {

    static get schema() {
        return {
            name: String,
            email: String,
            password: String
        }
    }
    constructor(expressApp) {
        const schema = new mongoose.Schema(this.constructor.schema);
        const myModel = mongoose.model('User', schema);

        expressApp.post('/register', (req, res) => {
            console.log('Body', req.body);
            let password;

            bcrypt.hash(req.body.password, 10, function(err, hash) {
              // Store hash in your password DB.
              if(err){
                console.error(err);
              }

              req.body.password = hash;
              console.log(req.body);

              //Success, save the user into db
              const entity = new myModel(req.body);
              entity.save(() => {
                  // Newly created and saved Mongoose object
                  // with  _id and __v properties
                  res.json(entity);
              });

            });

        });

        expressApp.post('/login', (req, res) => {
            console.log("req " + req);
            let query = myModel.findOne({ "email": req.body.email });
            console.log("query " + query);
            query.select('email password name');
            query.exec(function (err, person) {
                if (err) {
                    res.json(JSON.stringify(err));
                    return;
                }

                if(!person){
                  res.json({message: 'Mail finns ej'});
                  return;
                }

                bcrypt.compare(req.body.password, person.password, function(err, result) {
                  if(result) {
                   // Passwords match
                   res.json({result:person});
                  } else {
                   // Passwords don't match
                   res.json({ result: 'Login fail!' });
                  }
                });
                // if (person.password == req.body.password) {
                //      res.json({result:person.name});
                // } else {
                //     res.json({ result: 'Login fail!' });
                // }

            });
        });

    }

}

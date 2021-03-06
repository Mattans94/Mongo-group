const qs = require('qs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/coffeeDB');
const db = mongoose.connection;
const session = require('./session');
db.on('error', (e) => { console.error(e); });
db.once('open', () => { console.info('db connected'); });

module.exports = class User {

    static get schema() {
        return {
            name: String,
            email: String,
            password: String,
            role: String
        }
    }
    constructor(expressApp) {
        const schema = new mongoose.Schema(this.constructor.schema);
        const myModel = mongoose.model('User', schema);
        this.myModel = myModel;

        expressApp.post('/register', (req, res) => {
            let password;

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    console.error(err);
                }

                req.body.password = hash;

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
            let query = myModel.findOne({ "email": req.body.email });
            query.select('email password name role');
            query.exec(function (err, person) {
                if (err) {
                    res.json(JSON.stringify(err));
                    return;
                }
                if (!person) {
                    res.json({ message: 'Mail finns ej' });
                    return;
                }
                // if (person.password == req.body.password) {
                //     req.session.data.user = person;
                //     req.session.markModified('data');
                //     req.session.save();
                //     res.cookie('user', person.name);
                //     res.json({ result: person.name });
                // } else {
                //     res.json({ result: 'Login fail!' });
                // }

                bcrypt.compare(req.body.password, person.password, function (err, result) {
                    if (result) {
                        // Passwords match
                        req.session.data.user = person;
                        req.session.markModified('data');
                        req.session.loggedIn = true;
                        req.session.save();
                        res.cookie('user', person.name);
                        res.cookie('role', person.role);
                        res.cookie('email', person.email);
                        res.json({
                            message: 'Du är inloggad!',
                            result: person.name
                        });
                    } else {
                        // Passwords don't match
                        res.json({ message: 'Inloggningen misslyckades!' });
                    }
                });
                // if (person.password == req.body.password) {
                //      res.json({result:person.name});
                // } else {
                //     res.json({ result: 'Login fail!' });
                // }

            });
        });

        // expressApp.get('/user', (req, res)=>{
        //     // check if there is a logged-in user and return that user
        //     let response;
        //     if(req.person._id){
        //       response = req.person;
        //       // never send the password back
        //       response.password = '******';
        //     }else{
        //       response = {message: 'Not logged in'};
        //     }
        //     res.json(response);
        //   });



        expressApp.get('/logouts', async (req, res) =>{

          if(req.session && req.session.data && req.session.data.user){
            delete req.session.data.user;
            req.session.markModified('data');
            req.session.save(() => {
              res.json({logoutOk: 'Logged out',
              result: []
              });
            });
          } else{
            res.json({
              logoutOk: 'Not logged out',
              result: []
            });
          }


        });

    }



}

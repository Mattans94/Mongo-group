const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Session = mongoose.model('Session', new Schema({
  loggedIn: {type:Boolean, default:false},
  data: Schema.Types.Mixed
}));

async function session(req, res, next){
  if(!req.cookies.session){
    // set a cookie for a session if it doesn't exist
    let mySession = new Session();
    // see https://expressjs.com/en/4x/api.html#res.cookie
    res.cookie('session', mySession._id, {
      path: '/',
      httpOnly: false
    });
    console.log(req.cookies.session);
    mySession.save();
    req.session = mySession;
    next();
  }
  else {
    // Retrieve a session from a session cookie value
    let sessions = await Session.find({_id:req.cookies.session});
    if(sessions[0]){
      req.session = sessions[0];
      req.session.data = req.session.data || {};
      if(req.session.data.userId && req.session.loggedIn){ // is there a userId saved on the session?
        let users = await User.find({_id: req.session.data.userId});
        if(users[0]){
          req.session.user = users[0]; // apply the user object
        }
      }
      next();
    }else{
      delete(req.cookies.session);
      return session(req, res, next);
    }
  }
}

module.exports = session;

const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const Session = mongoose.model('Session', new Schema({
  data: Schema.Types.Mixed
}));

function session(req, res, next){
  if(!req.cookies.session || !req.session){
    // set a cookie for a session if it doesn't exist
    req.session = new Session();
    // see https://expressjs.com/en/4x/api.html#res.cookie
    res.cookie('session', req.session._id, {
      path: '/',
      httpOnly: true
    });
    req.session.save(next);
  }
  else {
    // Retrieve a session from a session cookie value
    req.session.find({_id:req.cookies.session}, (err, sessions)=>{
      if(sessions[0]){
        req.session = sessions[0];
        req.session.data = req.session.data || {};
        next();
      }else{
        delete(req.cookies.session);
        return session(req, res, next);
      }
    });
  }
}

module.exports = session;
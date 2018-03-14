const qs = require('qs');

module.exports = class LoginHandler {

  constructor(expressApp){
    this.expressApp = expressApp;
    this.loginRoute();
    this.logoutRoute();
  }

  loginRoute(){
    this.expressApp.get('/logins/?*', (req, res) => {

      if(req.session && req.session.data && req.session.data.user){
        res.json({
          loginOk: 'Already logged in',
          resultLength: 1,
          result: [req.session.data.user]
        });
        return;
      }

      let params;

      // check if params is a stringified object
      try {
        let obj = JSON.parse(req.params[0]);
        if(typeof obj == 'object'){
          params = obj;
        }
      }
      catch(e){}

      // get params
      params = params || qs.parse(req.params[0]);
      params.email = params.email || -1;
      params.password = params.password || - 1;

      User.find(params, (err, data) => {

        data = data ? data : [];

        if(data.length > 0){
          req.session.data.user = data[0];
          req.session.markModified('data');
          req.session.save();
        }

        res.json({
          loginOk: data.length > 0,
          query:params,
          resultLength: data ? data.length : 0,
          result: data || []
        });
      });

    });
  }

  logoutRoute(){
    this.expressApp.get('/logouts', (req,res) => {
      if(req.session && req.session.data && req.session.data.user){
        delete req.session.data.user;
        req.session.markModified('data');
        req.session.save(() => {
          res.json({
            logoutOk: 'User logged out.',
            result: []
          });
        });
      }
      else {
        res.json({
          logoutOk: 'No user to log out.',
          result: []
        });
      }
    });

  }

}
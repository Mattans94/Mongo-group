module.exports = class UserRouteProtector {

    constructor(options){
      this.options = options; // none expected yet
      return (...args) => this.middleware(...args);
    }
  
    middleware(req, res, next){
      if(
        req.url.split('/')[1].indexOf('users') === 0
        && ['GET', 'PUT', 'DELETE'].includes(req.method)
      ){
        let userId = req.session && req.session.data &&
          req.session.data.user && req.session.data.user._id;
        userId = userId || -1;
        req._params = [ JSON.stringify({_id: userId}) ];
      }
      next();
    }
  
  }
module.exports = class Session extends ModelAndRoutes {

    static get schema(){
      return {
        data: Schema.Types.Mixed
      }
    }
  
  }
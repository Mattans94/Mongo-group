class App extends Base {
    constructor() {
        super();
        this.start();
        this.clickEvents();
    }

    clickEvents() {
        let that=this;
        $(document).on("click", '#loginModalToggle', function () {
            that.profile.toggleLoginModal();
        });


    }

    start(){
      this.rest = new REST();
      this.profile = new Profile();
      this.cart = new Cart(this.rest, this.profile);
      this.popState = new PopStateHandler(this);
    }
}

class App extends REST {
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
      this.navbar = new Navbar(this);
      this.startsida = new Startsida(this);
      this.rest = new REST();
      this.profile = new Profile();
      this.cart = new Cart(this.rest, this.profile);
      this.popState = new PopStateHandler(this);
    }
}

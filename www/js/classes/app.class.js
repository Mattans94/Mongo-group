class App extends REST {
    constructor() {
        super();
        this.load();
        this.clickEvents();
    }

    clickEvents() {
        let that=this;
        $(document).on("click", '#loginModalToggle', function () {
            that.profile.toggleLoginModal();
        });
    }

    async load(){
      this.beans = await Bean.find({});
      console.log('Beans are', this.beans);

      this.powders = await Powder.find({});
      console.log('Powders are', this.powders);

      this.capsules = await Capsule.find({});
      console.log('Capsules are', this.capsules);

      this.tools = await Tool.find({});
      console.log('Tools are', this.tools);

      this.start();
    }

    start(){
      // Create a footer



      this.navbar = new Navbar(this);
      this.startsida = new Startsida(this);
      this.rest = new REST();
      this.profile = new Profile();
      this.cart = new Cart(this.rest, this.profile);
      this.popState = new PopStateHandler(this);

      this.footer = new Footer();
      $('footer').empty();
      this.footer.render('footer');
    }
}

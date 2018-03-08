class App extends REST {
    constructor() {
        super();
        this.load();
        this.clickEvents();
        console.log("app");
    }

    clickEvents() {
        let that=this;
        $(document).on("click", '#loginModalToggle', function () {
            that.profile.toggleLoginModal();
        });
    }

    async load(){
      // await JSON._classes('Product');
      await this.start();

      this.beans = await Bean.find({});
      console.log('Beans are', this.beans);

      this.powders = await Powder.find({});
      console.log('Powders are', this.powders);

      this.capsules = await Capsule.find({});
      console.log('Capsules are', this.capsules);

      this.tools = await Tool.find({});
      console.log('Tools are', this.tools);


    }

    async start(){
      // Create a footer
      this.footer = await new Footer();
      $('footer').empty();
      this.footer.render('footer');


      this.navbar = new Navbar(this);
      this.startsida = new Startsida(this);
      this.product = new Product(this);
      this.cart = await new Cart(this, this.profile);
      this.profile = new Profile();
      this.omOss = new OmOss(this);
      this.conditions = new Conditions();
      this.admin = new Admin(this);
      this.popState = new PopStateHandler(this);
    }
}

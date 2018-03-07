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


      this.navbar = await new Navbar(this);
      this.startsida = await new Startsida(this);
      this.product = await new Product(this);
      this.profile = await new Profile();
      this.omOss = await new OmOss(this);
      this.cart = await new Cart(this, this.profile);
      this.popState = await new PopStateHandler(this);
    }
}

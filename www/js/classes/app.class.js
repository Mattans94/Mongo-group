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
      this.products = await Product.find({});

      this.beans = await Product.find({ type: 'Bean'});
      console.log('Beans are', this.beans);

      this.powders = await Product.find({ type: 'Powder'});
      console.log('Powders are', this.powders);

      this.capsules = await Product.find({ type: 'Capsule'});
      console.log('Capsules are', this.capsules);

      this.tools = await Tool.find({});
      console.log('Tools are', this.tools);

      this.orders = await Order.find({});

      this.start();
    }

    async updateProducts() {
      const types = {
        beans: 'Bean',
        powders: 'Powder',
        capsules: 'Capsule',
        tools: 'Tool'
      };

      for (const key in types) {
        this[key] = await Product.find({ type: types[key] });
      }
    }

    async updateOrders() {
      this.orders = await Order.find({});
    }
    async start(){
      this.footer = await new Footer();
      $('footer').empty();
      this.footer.render('footer');
      this.navbar = new Navbar(this);
      this.startsida = new Startsida(this);
      this.product = new Product(this);
      this.cart = new Cart(this, this.profile);
      this.profile = new Profile();
      this.productPage = new ProductPage(this);
      this.info = new Info(this);
      this.omOss = new OmOss(this);
      this.conditions = new Conditions();
      this.userPage = new UserPage(this);
      this.admin = new Admin(this);
      this.checkout = new Checkout(this);
      this.popState = new PopStateHandler(this);
    }
}

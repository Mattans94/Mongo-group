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

    this.tools = await Tool.find({});

    this.start();
    console.log(this.products, 'app klass');
  }

  start(){
    // Create a footer
    this.footer = new Footer();
    $('footer').empty();
    this.footer.render('footer');


    this.navbar = new Navbar(this);
    this.startsida = new Startsida(this);
    this.product = new Product(this);
    this.profile = new Profile();
    this.omOss = new OmOss(this);
    this.conditions = new Conditions();
    this.cart = new Cart(this.rest, this.profile);
    this.admin = new Admin(this);
    this.popState = new PopStateHandler(this);
  }
}

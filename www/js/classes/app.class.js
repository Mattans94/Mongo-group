class App extends REST {
    constructor() {
        super();
        this.load();
        this.clickEvents();
        console.log("app");
    }

    clickEvents() {
        let that = this;
        $(document).on("click", '#loginModalToggle', function () {
            that.profile.toggleLoginModal();
        });
    }

    async load() {
        this.beans = await Bean.find({});
        console.log('Beans are', this.beans);

        this.powders = await Powder.find({});
        console.log('Powders are', this.powders);

        this.capsules = await Capsule.find({});
        console.log('Capsules are', this.capsules);

        this.tools = await Tool.find({});
        console.log('Tools are', this.tools);

        this.carts = await Cart.find({});
        console.log('Shopping Carts', this.carts);

        this.profiles = await Profile.find({});
        console.log('Profiles', this.profiles);

        // this.orders = await Order.find({});
        // console.log('Orders', this.orders);

        this.start();


    }

    start() {
        // Create a footer
        this.footer = new Footer();
        $('footer').empty();
        this.footer.render('footer');


        this.navbar = new Navbar(this);
        this.startsida = new Startsida(this);
        this.product = new Product(this);
        this.profile = new Profile(this.rest, this.cart);
        this.omOss = new OmOss(this);
        this.cart = new Cart();
        this.order = new Order(this);
        this.popState = new PopStateHandler(this);
       
    }
}

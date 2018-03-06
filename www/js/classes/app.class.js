class App extends Base {
    constructor() {
        super();
        this.rest = new REST();
        this.profile=new Profile();
        this.cart = new Cart(this.rest, this.profile);
        this.changePage();
        this.clickEvents();
    }

    checkout()
    {
        $('main').empty();
        this.cart.render('main', 'CheckOut');
        this.cart.renderTotalPriceWithVAT();
        this.profile.render('.stepBox','Address');
    }

    changePage() {
        let url = location.pathname;
        if (url == '/shoppingCart') {
            $('main').empty();
            this.cart.render('main', 'Basket');
            this.cart.renderShoppingList();
            this.cart.renderTotalPriceWithVAT();
        }
        if (url == '/register') {
            $('main').empty();
            this.profile.render('main', 'Register');
        }
        if (url == '/checkout') {
            $('main').empty();
            this.cart.render('main', 'CheckOut');
            this.cart.renderTotalPriceWithVAT();
            this.profile.render('.stepBox','Address');
        }
    


    }
    clickEvents() {
        let that=this;
        $(document).on("click", '#loginModalToggle', function () {
            that.profile.toggleLoginModal();
        });


    }
}
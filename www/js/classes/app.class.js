class App extends Base {
    constructor() {
        super();
        this.rest = new REST();
        this.cart = new Cart(this.rest);
        this.profile=new Profile();
        this.changePage();
        this.clickEvents();
    }

    changePage() {
        let url = location.pathname;
        if (url == '/shoppingCart') {
            $('main').empty();
            this.cart.render('main', 'Basket');
            this.cart.renderShoppingList();
            this.cart.renderTotalPriceWithVAT();
        }
    }
    clickEvents() {
        let that=this;
        $(document).on("click", '#loginModalToggle', function () {
            that.profile.toggleLoginModal();
        });


    }
}
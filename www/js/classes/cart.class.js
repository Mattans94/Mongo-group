class Cart extends REST {
    constructor(app, profile) {
        super();
        this.app = app;
        this.profile = profile;
        this.products = [];
        this.clickEvents();
    }

    addProductToArray(product){
      this.products.push(product);
      this.renderCartContent();
    }

    renderShoppingList() {
        $('#shoppingList').empty();
        this.render('#shoppingList', 'ShoppingList');
    }
    renderTotalPriceWithVAT() {
        $('#order-summary').empty();
        this.render('#order-summary', 'OrderSummary');

    }

    renderCartContent(){
      console.log('Hejsan');
      $('.cart-content').empty();
      console.log('HAllå', this.products);
      console.log(this.products.render('.cart-content', 'CartContent'));
    }
    clickEvents() {
        let that = this;
        $(document).on("click", '.address-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".address-btn").addClass("active");
            $('.stepBox').empty();
            that.profile.render('.stepBox', 'Address');
        });
        $(document).on("click", '.delivery-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".delivery-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Delivery');
        });
        $(document).on("click", '.payment-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".payment-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Payment');

      });
  }
}

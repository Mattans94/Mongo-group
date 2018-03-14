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

    // Ger priset på en vara utan moms
    // getPriceWithoutVAT(price) {
    //   let priceWithoutVAT = price / 1.12;
    //   return priceWithoutVAT.toFixed(2);
    // }

    // Ger moms-satsen av ett givet pris
    // getVATFromTotalPrice(price) {
    //   let priceWithoutVAT = price / 1.12;
    //   let VAT = price - priceWithoutVAT;
    //   return VAT.toFixed(2);
    // }

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

      $(document).on("click", '.card-btn', function () {
        let dataId = $(this).data('id');
          Cart.create({product: dataId, sessionId: Cart.getSessionId() });

      });
  }

  static getSessionId(){
    return document.cookie.substr('session='.length);
  }
}

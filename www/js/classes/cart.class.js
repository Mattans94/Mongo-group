class Cart extends REST {
    constructor(cart) {
        super(cart);
    }

    renderShoppingList() {
        $('#shoppingList').empty();
        this.render('#shoppingList', 'ShoppingList');
    }
    renderTotalPriceWithVAT() {
        $('#order-summary').empty();
        this.render('#order-summary', 'OrderSummary');
    }

    async renderCartContent(){
      let session = Cart.getSessionId();
      let sessionProducts = await Cart.find({
        sessionId: session
      });
      let products = [];
      for(let obj of sessionProducts){
        for(let prodObj of app.products){
          if(obj.product == prodObj._id){
            prodObj.cartItem = obj;
            products.push(prodObj);
          }
        }
      }
      console.log('Mina produkter', products);
      $('.cart-content').empty();
      products.render('.cart-content', 'CartContent');
      this.calculateAndRenderTotalPrice();
      this.getVATFromTotalPrice();
    }

    // Ger priset på en vara utan moms
    // getPriceWithoutVAT(price) {
    //   let priceWithoutVAT = price / 1.12;
    //   return priceWithoutVAT.toFixed(2);
    // }

    // Ger moms-satsen av ett givet pris
    getVATFromTotalPrice() {
      $('.VAT-of-total-price').empty();
      let cartTotal = 0;
      $('.unit-total-price').each(function(){
        cartTotal += parseInt($(this).text().replace('kr', ''));
      });

      let priceWithoutVAT = cartTotal / 1.12;
      let VAT = cartTotal - priceWithoutVAT;

      $('.VAT-of-total-price').append(`${VAT.toFixed(0)}kr`);
    }

    calculateAndRenderTotalPrice(){
      $('.cart-total-price').empty();
      let cartTotal = 0;

      $('.unit-total-price').each(function(){
        cartTotal += parseInt($(this).text().replace('kr', ''));
      });

      console.log(cartTotal);
      $('.cart-total-price').append(`${cartTotal}kr`);
    }


    click() {
      console.log('HELOOOO');
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



  static getSessionId(){
    return (document.cookie.substr('session='.length)).replace(/%/g,'');
  }
}

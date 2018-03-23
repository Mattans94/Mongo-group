class Cart extends REST {
  constructor(cart, app) {
    super(cart);
    this.app=app;
    this.cartTotal = 0;
    this.totalPriceWithoutVAT = 0;
    this.VAT = 0;
    this.totalQuantity = 0;
  }

  renderShoppingList() {
    $('#shoppingList').empty();
    this.render('#shoppingList', 'ShoppingList');
  }
  renderTotalPriceWithVAT() {
    $('#order-summary').empty();
    this.render('#order-summary', 'OrderSummary');
    this.render('#total-without-shipping', 'TotalPrice');
  }

  async renderCartContent() {
    let session = Cart.getSessionId();
    let sessionProducts = await Cart.find({
      sessionId: session
    });
    let products = [];
    for (let obj of sessionProducts) {
      for (let prodObj of app.products) {
        if (obj.product == prodObj._id) {
          prodObj.cartItem = obj;
          products.push(prodObj);
        }
      }
    }
    $('.cart-content').empty();
    products.render('.cart-content', 'CartContent');
    this.calculateAndRenderTotalPrice();
    this.getVATFromTotalPrice();
  }

  //Method to update the bade value in the navbar. Run this everytime
  //you make a change in the cart!
  static async updateCartBadgeValue() {

    let session = Cart.getSessionId();
    let sessionCartObjs = await Cart.find({ sessionId: session });
    let qtyOfProds = 0;

    let totalQtyOfProds = sessionCartObjs.map(o => qtyOfProds += o.quantity);

    app.navbar.qty = totalQtyOfProds[totalQtyOfProds.length - 1];
    this.totalQuantity = totalQtyOfProds[totalQtyOfProds.length - 1];

      $('header').empty();
      app.navbar.render('header');
      app.navbar.changeLoginBtn();

    }


  // Ger priset på en vara utan moms
  // getPriceWithoutVAT(price) {
  //   let priceWithoutVAT = price / 1.12;
  //   return priceWithoutVAT.toFixed(2);
  // }

    // Ger moms-satsen av ett givet pris
    getVATFromTotalPrice() {
      $('.VAT-of-total-price').empty();
      $('.VAT-of-total-exkl').empty();
      let cartTotal = 0;
      $('.unit-total-price').each(function(){
        cartTotal += parseInt($(this).text().replace('kr', ''));
      });


      let priceWithoutVAT = cartTotal / 1.12;
      this.totalPriceWithoutVAT = priceWithoutVAT.toFixed();
      let VAT = cartTotal - priceWithoutVAT;
      this.VAT = VAT.toFixed();
      $('.VAT-of-total-exkl').append(`${priceWithoutVAT.toFixed(0)}kr`);
      $('.VAT-of-total-price').append(`${VAT.toFixed(0)}kr`);
    }



  calculateAndRenderTotalPrice() {
    $('.cart-total-price').empty();
    let cartTotal = 0;

    $('.unit-total-price').each(function () {
      cartTotal += parseInt($(this).text().replace('kr', ''));
    });
    this.cartTotal = cartTotal;

    if(location.pathname == '/checkout'){
      $('#total-without-shipping').empty();
      $('.addShipping').empty();
      app.checkout.subTotal = this.cartTotal + app.checkout.dFee;
      this.render('#total-without-shipping', 'TotalPrice');
      $('.addShipping').append(`<td>Total</td>
            <th>${app.checkout.subTotal}kr</th>`);

    }
    $('.cart-total-price').append(`${cartTotal}kr`);
  }


  click() {
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



  static getSessionId() {
    return (document.cookie.substr('session='.length)).replace(/%/g, '');
  }

  getCartData(){

  }
}

class Info extends REST {
  constructor() {
    super();
    this.app = app;
  }

  //Disables the add to cart button when max amount of products is added to the cart
  //Parameter id refers to the product's _id
  static async disableCartButtonStock(id){
    let product = await Product.findOne({ _id: id });
    let cartItems = await Cart.find({
      product: product._id
    });

    let totalCartQty = 0;

    if(cartItems.length){
      cartItems.forEach(item => totalCartQty += item.quantity);
      console.log('Items', cartItems, 'Total', totalCartQty);
      if(totalCartQty >= product.stock){
        console.log('Cart quantity reached limit!');
        //If on produkter page, just disable the button, and do not change the text
        if(location.pathname == '/produkter'){
          $(`button[data-id="${id}"]`)
          .addClass('disabled')
          .css('cursor', 'not-allowed').tooltip('enable');
          return true;
        } else {
          $(`button[data-id="${id}"]`)
          .prop('disabled', true)
          .text('Max antal varor tillagt')
          .css('cursor', 'not-allowed');
          return true;
          }
      } else {
        $("#quantity").val('1');
      }
    }
  }

  connectCapsuleAndTool(id) {
    const tools = [];
    this.app.capsules.forEach(capsule =>
      { if (capsule._id === id) {
        capsule.tools.forEach(async tool => {
          await tools.push(tool.name);
        });
      };
    });
    return tools.join(', ');
  }

  async getProduct(id) {
    this.productInfo = await Product.find({ _id: id });
    console.log(this.productInfo);

    $('.product-info').empty();
    $('.product-info').append(`

		<div class="col-12 col-md-4">
      <img class="card-img-top rounded mx-auto d-block mt-4 mb-4" src="/imgs/${this.productInfo[0].type}/${this.productInfo[0].image}" alt="Card image cap">
    </div>

    <div class="col-12 col-md-8">
      <h2 class="mb-4">${this.productInfo[0].name}</h2>
      <div class="price font-weight-bold">
        <span>${this.productInfo[0].price} </span> kr
      </div>
      <div class="mt-4">
        <div class="d-flex justify-content-start">
         ${ this.productInfo[0].stock > 0
        ? `<i class="fas fa-check mr-3 mt-1"></i> <p class="mb-0">${this.productInfo[0].stock} st i lager</p>`
        : '<i class="fas fa-times mr-3 mt-1"></i> <p class="font-weight-bold text-danger mb-0">Finns ej i lager</p>'}
        </div>
        <div class="d-flex justify-content-start">
          <i class="fas fa-truck mr-2 mt-2"></i>
          <p>Skickas normalt inom: 1-3 arbetsdagar</p>
        </div>
      </div>

      <div class="col-12 d-flex justify-content-start px-0">
        <div class="${this.productInfo[0].stock == 0 ? 'd-none' : ''} col-8 col-sm-5 col-lg-4 col-xl-3 mt-2 px-0">
          <form class="d-flex justify-content-start">
            <div class="form-group d-flex justify-content-start">
              <button type="button" class="btn-sm text-light my-2" id="minus-btn">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <input disabled class="form-control form-control-sm mt-2 col-3 text-center font-weight-bold" id="quantity" type="text" value="1">
              <button type="button" class="btn-sm text-light my-2 2" id="plus-btn">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="col-4 col-sm-7 col-md-6 col-xl-9 pl-0 mt-2">
          <button class="${this.productInfo[0].stock == 0 ? 'd-none' : ''} btn btn-sm text-light font-weight-bold btn-cart mt-2 card-btn" data-id="${this.productInfo[0]._id}" ${Info.disableCartButtonStock(this.productInfo[0]._id)}>
          Lägg i korgen
          </button>
        </div>
      </div>
      <!-- </div> -->

      <p class="font-weight-bold mt-4">${this.productInfo[0].flavor}</p>
      <div>
        <p>${this.productInfo[0].description}</p>
        <p class="mt-4">Ursprung:
          <span>${this.productInfo[0].countryOfOrigin}</span>
        </p>
        <p>Typ: ${this.productInfo[0].type}</p>
        <p>${this.productInfo[0].type == 'Capsule' ? 'Antal:' : 'Vikt:'}
        	${this.productInfo[0].quantity} ${this.productInfo[0].type == 'Capsule' ? 'st' : 'gram'}
        </p>
        <p>${this.productInfo[0].type == 'Capsule' ?
        `Kapslarna passar till kapselmaskiner frånt t.ex.${this.connectCapsuleAndTool(id)} med flera.` : ''}</p>
      </div>
    </div>`);
  }



  async click(e) {


    // get the current value of the input
    // get the stock value
    let currentValue = parseInt($('#quantity').val());
    const stock = this.productInfo[0].stock;
    const product = this.productInfo[0];
    let cartItems = await Cart.find({
      product: product._id,
    });

    let totalCartQty = 0;
    cartItems.forEach(item => totalCartQty += item.quantity);

    // you can't order more than there is in stock
    if ($(e.target).is('#plus-btn') || $(e.target).parent().is('#plus-btn')) {
      if(cartItems.length){
        console.log('Here i am');

        !((totalCartQty + currentValue + 1) > stock) ? $("#quantity").val(currentValue + 1)
        : $("#quantity").val(1);
      } else if(currentValue < stock){
        $("#quantity").val(currentValue + 1);


      }
    }
    // the least amount you can order is 1
    if ($(e.target).is('#minus-btn') || $(e.target).parent().is('#minus-btn')) {
      (currentValue > 1) && $("#quantity").val(currentValue - 1);
    }
    console.log('Current', currentValue + 1);
    // add product to cart
    $(e.target).hasClass('card-btn') && ProductPage.addProductToCart(e.target, currentValue);
  }

}

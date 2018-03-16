class Product extends REST {

  constructor(o){
    super(o);
    if(!Product.hasEvents){
      this.events();
      Product.hasEvents = true;
    }

  }

  events(){
    console.log('gdsgsdgsd');
    $(document).on('change, input', '.quantity-control', async function(){
      let sessionId = Cart.getSessionId();
      let prodId = $(this).data('id');
      let qtyVal = parseInt($(this).val());
      console.log('Quantity', qtyVal);

      let product = await Cart.findOne({product: prodId, sessionId });

      product.quantity = qtyVal;
      product.save();

      //Re-render cart
      app.cart.renderCartContent();

    });

    $(document).on('click', '.trash-item', async function(){
      let sessionId = Cart.getSessionId();
      let prodId = $(this).data('id');

      let product = await Cart.findOne({product: prodId, sessionId});

      product.delete();

      //Re-render cart content
      app.cart.renderCartContent();
    });
  }


}

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
      let qtyField = $(this).val();
      let qtyVal = parseInt(qtyField);
      console.log('Quantity', qtyVal);

      if(qtyField === NaN || qtyField === null || qtyField < 1 || qtyField == ""){
        qtyVal = 1;
      }

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

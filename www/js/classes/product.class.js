class Product extends REST {

  constructor(o) {
    super(o);
    if (!Product.hasEvents) {
      this.events();
      Product.hasEvents = true;
    }

  }

  events(){

    $(document).on('click', 'table form #plus-btn, table form #minus-btn', async function(){

      let sessionId = Cart.getSessionId();
      let prodId = $(this).parent().find('.quantity-control').data('id');
      let qtyField = $(this).parent().find('.quantity-control');
      let qtyVal = parseInt(qtyField.val());
      let product = await Product.findOne({_id: prodId});
      console.log('Quantity', qtyVal);

      if($(qtyField).val() === NaN || $(qtyField).val() === 'null' || $(qtyField).val() < 1 ){
        $(qtyField).val(1);
        return;
      }

      if($(this).is('#plus-btn') && qtyVal < product.stock){
        qtyVal++;
        $(qtyField).val(qtyVal);

      } else if($(this).is('#minus-btn') && qtyVal != 1){
        qtyVal--;
        $(qtyField).val(qtyVal);

      } else if(qtyVal == product.stock){
        $('#plus-btn').prop('disabled', true);
      } else $('#minus-btn').prop('disabled', true)

      let cartItem = await Cart.findOne({product: prodId, sessionId });

      cartItem.quantity = qtyVal;
      await cartItem.save();
      Cart.updateCartBadgeValue();
      //Re-render cart
      app.cart.renderCartContent();






      // let qtyField = $(this).parent().find('.quantity-control');
      // let qtyVal = parseInt(qtyField.val());
      // qtyVal++;
      //
      // $(qtyField).val(qtyVal);
      //
      // console.log('QTYFIELD', qtyVal);
    });

    $(document).on('change, input', '.quantity-control', async function(){
      let sessionId = Cart.getSessionId();
      console.log("sessionId " + sessionId);
      let prodId = $(this).data('id');
      let qtyField = $(this).text();
      let qtyVal = parseInt(qtyField);
      console.log('Quantity', qtyVal);

      if(qtyField === NaN || qtyField === 'null' || qtyField < 1 || qtyField == ""){
        qtyVal = 1;
      }

      product.quantity = qtyVal;
      await product.save();
      Cart.updateCartBadgeValue();
      //Re-render cart
      app.cart.renderCartContent();

    });

    $(document).on('click', '.trash-item', async function () {
      let sessionId = Cart.getSessionId();
      let prodId = $(this).data('id');

      let product = await Cart.findOne({ product: prodId, sessionId });

      await product.delete();
      Cart.updateCartBadgeValue();
      //Re-render cart content
      app.cart.renderCartContent();
    });
  }


}

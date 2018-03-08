class Admin extends REST {
  constructor(app){
    super();
    this.app = app;
  }

  click2(event) {
    event.preventDefault();
    if ($(event.target).is('#add-btn')) {
      const product = {};
      product.name = $('#inputName').val();
      product.image = $('#inputPhoto').val();
      product.description = $('#inputDescription').val();
      product.price = parseInt($('#inputPrice').val());
      product.quantity = parseInt($('#inputQuantity').val());
      product.flavor = $('#inputFlavor').val();
      product.countryOfOrigin = $('#inputCountry').val();
      product.type = $('#inputType').val();

      console.log(product);
      Bean.create(product);
    }
  }

}
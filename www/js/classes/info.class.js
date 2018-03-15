class Info extends REST {
	constructor(){
		super();
		this.app = app;
	}

	async getProduct(id){
		this.productInfo = await Product.find({_id: id});
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
          	? `<i class="fas fa-check mr-3 mt-1"></i> <p class="mb-0">${this.productInfo[0].stock } st i lager</p>` 
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
              <input class="form-control form-control-sm mt-2 col-3 text-center font-weight-bold" id="quantity" type="text" value="1">
              <button type="button" class="btn-sm text-light my-2 2" id="plus-btn">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="col-4 col-sm-7 col-md-6 col-xl-9 pl-0 mt-2">
          <button class="${this.productInfo[0].stock == 0 ? 'd-none' : ''} btn btn-sm text-light font-weight-bold btn-cart mt-2 info-btn" data-id="${this.productInfo[0]._id}" >Lägg i korgen</button>
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
      </div>
    </div>`);
	}




	click(e) {
    // add product to cart
    $(e.target).hasClass('info-btn') && ProductPage.addProductToCart(e.target);

    // get the current value of the input
    // get the stock value
    let currentValue = parseInt( $('#quantity').val() );
    const stock = this.productInfo[0].stock;

    // you can't order more than there is in stock
		if ( $(e.target).is('#plus-btn') || $(e.target).parent().is('#plus-btn') ){
      (currentValue < stock) && $("#quantity").val(currentValue+1);
		}
    // the least amount you can order is 1
		if ($(e.target).is('#minus-btn') || $(e.target).parent().is('#minus-btn')){
			 (currentValue > 1) && $("#quantity").val(currentValue-1);
		}
	}

}





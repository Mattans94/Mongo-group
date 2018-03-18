class ProductPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    $(window).on('scroll', () => this.scrolling());
    this.makeCards();
  }


  click(event){
    $(event.target).hasClass('toTop') && $(window).scrollTop(0);
    $(event.target).hasClass('card-btn') && ProductPage.addProductToCart(event.target);
  }

  static async addProductToCart(target, qty){
    console.log($(target).data('id'));
    let dataId = $(target).data('id');
    console.log('Data-id', dataId)
    let product = await Product.findOne({
      _id: dataId
    });
    let productStock = product.stock;
    console.log('STOCK', productStock);
    console.log('Hejsan', dataId);
    console.log( '_________', await Cart.find({product: dataId, sessionId: Cart.getSessionId()}) );
    let cartItem = await Cart.findOne({product: dataId, sessionId: Cart.getSessionId()});
    let allCartItems = await Cart.find({product: dataId});

    let totalCartQty = 0;
    allCartItems.forEach(item => totalCartQty += item.quantity);

    if(totalCartQty >= product.stock){
      console.log('Should not add to cart!');
      Info.disableCartButtonStock(dataId);
      return;
    }

    if (!cartItem) {
      Cart.create({product: dataId, sessionId: Cart.getSessionId(), quantity: qty});
    } else if(!qty && cartItem.quantity < productStock) {
      //If no quantity is passed to the function
      cartItem.quantity++;
      await cartItem.save();
    } else if(cartItem.quantity < productStock){
      //Prevents the user from adding more products to the cart
      //than the stock value
      cartItem.quantity += qty;
      await cartItem.save();
    }

    Info.disableCartButtonStock(dataId);
    //Animation on product page
    //Select item image and pass to the function
    if(location.pathname == "/produkter"){
      let itemImg = $(target).parent().parent().parent().find('img');
      console.log(itemImg);
      flyToElement($(itemImg), $('.shopping-cart'));

      setTimeout(() => {
        Cart.updateCartBadgeValue();
      }, 650);

      setTimeout(() => {
        $('.badge').css({'color': 'red'});
        // $('a[href="/varukorg"]').css('zoom', '1.2');
        $('.shopping-cart').addClass('shake shake-constant');
      }, 700);
      setTimeout(() => {
        $('.badge').css({'color': '#4fbfa8'});
        // $('a[href="/varukorg"]').css('zoom', 'normal');
        $('.shopping-cart').removeClass('shake shake-constant');
        console.log('lol');

      }, 900);
    } else Cart.updateCartBadgeValue();





  }

  // scroll arrow to appear when you have scrolled
  // down more than 500 otherwise hide it
  scrolling() {
    ($(window).scrollTop() > 500) ? $('.toTop').show() : $('.toTop').hide();
  }

  change(event) {
    if($(event.target).hasClass('form-check-input')) {
      this.selectedCategories = [];
      const checkedElements = $('input[name="check"]');
      for(let i = 0 ; i < checkedElements.length ; i++){
        (checkedElements[i].checked == true) && this.selectedCategories.push(checkedElements[i].value);
      }
      this.makeCards(this.selectedCategories);
    }
    $(event.target).hasClass('selectSorting') && this.makeCards(this.selectedCategories);
  }

  makeCards(categories = ['All']) {
    this.cards = [];
    this.products = [];

    const categoryData = {
      'Bean': [...this.app.beans],
      'Powder': [...this.app.powders],
      'Capsule': [...this.app.capsules],
      'All': [...this.app.beans, ...this.app.powders, ...this.app.capsules]
    };

    // take the products from the categoryData object
    // push the data into this.products
    categories.forEach(category => {
      categoryData[category].forEach( products => this.products.push(products) );
    });

    // call the sorting method
    this.sorting();

    // take the sorted products or not sorted products
    // empty out main and render out a card for each product
    this.products.forEach( product => this.html(product) );
    $('.cards').empty();

    // if this.cards is an empty array (when page first loads or when all checkboxes are unchecked)
    // this.makeCards function gets called with the parameter default value and
    // this.cards thats in the template product.page.html gets rendered out
    // else if this.cards is not an empty array the this.cards gets appended to the main.
    (this.cards.length == 0) ? this.makeCards() : $('.cards').append(this.cards.join(''));
  }

  sorting(){
    // sorting methods
    const sortingFuncs = {
      ascendingOrder: (property) => {
        this.products.sort((a, b) => {
            if(a[property] < b[property]) return -1;
            if(a[property] > b[property]) return 1;
            return 0;
        })
      },
      descendingOrder: (property) => {
        this.products.sort((a, b) => {
            if(a[property] > b[property]) return -1;
            if(a[property] < b[property]) return 1;
            return 0;
        })
      }
    };

    // get the value and data of the selected option
    let typeOfSorting = $( ".selectSorting option:selected" ).val();
    let property = $( ".selectSorting option:selected" ).attr('data-property');

    // if sorting is true and not equal to "sortering" option
    // call the sorting method from the sortingFuncs object.
    (typeOfSorting && typeOfSorting != 'sortering') && sortingFuncs[typeOfSorting](property);
  }


  html(product){
    this.cards.push(`
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card mb-3">
        <div class="card-holder rounded mx-auto d-block">
          <a class="pop product-information" href="/produkter/${product._id}">
            <img class="card-img-top rounded mx-auto d-block mt-4" data-name="${product.name}" src="/imgs/${product.type}/${product.image}" alt="Card image cap">
          </a>
        </div>
        <div class="card-body pb-0 mt-1">
          <div class="title-holder rounded mx-auto d-block">
            <h5 class="card-title">
              <a class="pop product-information" href="/${product._id}">${product.name}</a>
            </h5>
          </div>
          <p class="card-text description">${product.description}
          </p>
        </div>
        <div class="card-footer d-flex justify-content-around px-0">
          <div>
            <p class="float-left font-weight-bold ml-sm-3 mt-2">${product.price} kr</p>
          </div>
          <div class="ml-3">
          ${product.stock == 0 ? '<p class="text-danger font-weight-bold mt-2">Slut i lager</p>' : ` <button class=" btn btn-primary card-btn float-right " data-id="${product._id}" data-toggle="tooltip" title="Max antal av vara i varukorgen eller vara ej i lager">KÖP</button>` }

          </div>
        </div>
      </div>
    </div>`);
  }

}

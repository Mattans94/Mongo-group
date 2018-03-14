class ProductPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    $(window).on('scroll', () => this.scrolling());
    this.makeCards();
  }

  click(event){
    $(event.target).hasClass('toTop') && $(window).scrollTop(0);
  }

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

  html(product){
    this.cards.push(`
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card mb-3">
        <div class="card-holder rounded mx-auto d-block">
          <a href="#">
            <img class="card-img-top rounded mx-auto d-block mt-4" src="/imgs/${product.type}/${product.image}" alt="Card image cap">
          </a>
        </div>
        <div class="card-body pb-0 mt-1">
          <div class="title-holder rounded mx-auto d-block">
            <h5 class="card-title">
              <a href="#">${product.name}</a>
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
            <a href="#" class="btn btn-primary card-btn float-right">KÖP</a>
          </div>
        </div>
      </div>
    </div>`);
  }

}

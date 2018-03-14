class ProductPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    $(window).on('scroll', () => this.scrolling());
  }

  click(event){
    $(event.target).hasClass('toTop') && $(window).scrollTop(0);
  }

  scrolling() {
    ($(window).scrollTop() > 500) ? $('.toTop').show() : $('.toTop').hide();
  }

  change(event) {
    if($(event.target).hasClass('form-check-input')) {
      const selectedCategories = [];
      const checkedElements = $('input[name="check"]');
      for(let i = 0 ; i < checkedElements.length ; i++){
        (checkedElements[i].checked == true) && selectedCategories.push(checkedElements[i].value);
      }
      this.makeCards(selectedCategories);
    }
  }

  makeCards(categories) {
    console.log(categories)
    const categoryInstances = {
      'Bean': [this.app.beans],
      'Powder': [this.app.powders],
      'Capsule': [this.app.capsules],
      'All': [this.app.beans, this.app.powders, this.app.capsules]
    };
    this.cards = [];
    categories.forEach(category => {
      categoryInstances[category].forEach(products => {
        products.forEach(item => {
          this.cards.push(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div class="card mb-3">
                <div class="card-holder rounded mx-auto d-block">
                  <a href="#">
                    <img class="card-img-top rounded mx-auto d-block mt-4" src="/imgs/${item.type}/${item.image}" alt="Card image cap">
                  </a>
                </div>
                <div class="card-body pb-0 mt-1">
                  <div class="title-holder rounded mx-auto d-block">
                    <h5 class="card-title">
                      <a href="#">${item.name}</a>
                    </h5>
                  </div>
                  <p class="card-text description">${item.description}
                  </p>
                </div>
                <div class="card-footer d-flex justify-content-around px-0">
                  <div>
                    <p class="float-left font-weight-bold ml-sm-3 mt-2">${item.price} kr</p>
                  </div>
                  <div class="ml-3">
                    <a href="#" class="btn btn-primary card-btn float-right" data-id=${item._id}>KÖP</a>
                  </div>
                </div>
              </div>
            </div>
            `)
          });
        });
      });
    $('.cards').empty();
    (this.cards.length == 0)
    ? this.app.products.render('.cards', '2')
    : $('.cards').append(this.cards.join(''));
  }
}

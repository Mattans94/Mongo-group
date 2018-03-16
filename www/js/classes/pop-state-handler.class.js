class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!
  constructor(app) {
    this.app = app;
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());
    console.log("1111");

  }

  addEventHandler() {

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click', 'a.pop', function (e) {

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }

  changePage() {
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;
    console.log(url);

    // Change which menu link that is active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startsidan',
      '/produkter': 'produkter',
      '/om_oss' : 'omOss',
      '/info' : 'info',
      '/kopvillkor': 'conditions',
      '/shoppingCart': 'shoppingCart',
      '/register': 'register',
      '/checkout': 'checkout',
      '/mina_sidor': 'userPage',
      '/admin': 'admin',
      '/admin/stock': 'adminStock',
      '/admin/add': 'adminAdd',
      '/admin/change': 'adminChange',
      '/admin/delete': 'adminDelete'
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right menu item active
    this.app.navbar.setActive(url);

    //Render navbar
    this.renderNav();

    //Scroll to top of page
    window.scrollTo(0, 0);


  }

  renderNav() {
    $('header').empty();
    this.app.navbar.render('header');
  }

  startsidan() {
    $('title').text('CoffeeDB');
    $('main').empty();
    this.app.startsida.render('main');
    this.app.startsida.render('.carousel-container', 2); // Carousel
    this.app.startsida.render('.card-container', 3); // Cards
    this.app.startsida.callCarousel();
  }

  info(){
    $('main').empty();
    this.app.info.render('main');
    console.log('Körs');
  }

  produkter(){
    $('main').empty();
    this.app.productPage.render('main');
    console.log('Körs');
  }

  omOss() {
    $('.karusell').empty();
    $('main').empty();
    this.app.omOss.render('main');
    $('title').text('Om oss');
  }

  conditions() {
    $('.karusell').empty();
    $('main').empty();
    this.app.conditions.render('main');
    $('title').text('Köpvillkor');
  }

  shoppingCart() {
    $('main').empty();
    this.app.cart.render('main', 'Basket');
    this.app.cart.renderShoppingList();
    this.app.cart.renderTotalPriceWithVAT();
    this.app.cart.renderCartContent();
  }

  register() {
    $('main').empty();
    this.app.profile.render('main', 'Register');

  }

  checkout() {
    $('main').empty();
    this.app.checkout.getLastOrder().then(()=>{
      this.app.checkout.render('main', 'CheckOut');
      this.app.checkout.render('.stepBox','Address');
      this.app.cart.renderTotalPriceWithVAT();
    });

    // this.app.profile.render('.stepBox', 'Address');
  }

  userPage() {
    $('main').empty();
    this.app.userPage.render('main');
  }

  admin() {
    $('main').empty();
    this.app.admin.render('main');
    this.app.admin.selectedCategory = '';
  }

  adminStock() {
    $('main').empty();
    this.app.admin.render('main', 5);
    this.app.admin.selectedCategory = '';
  }

  adminAdd() {
    $('main').empty();
    this.app.admin.render('main', 2);
    this.app.admin.selectedCategory = '';
  }

  adminChange() {
    $('main').empty();
    this.app.admin.render('main', 3);
    this.app.admin.selectedCategory = '';
  }

  adminDelete() {
    $('main').empty();
    this.app.admin.render('main', 4);
    this.app.admin.selectedCategory = '';
    this.app.admin.setName(this.app.products);
  }


}

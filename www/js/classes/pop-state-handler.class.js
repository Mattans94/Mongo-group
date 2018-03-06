class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!
  constructor(app){
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

  }

  addEventHandler(){

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click','a.pop',function(e){

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }

   changePage(){
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;

    // Change which menu link that is active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startsidan',
      '/shoppingCart': 'shoppingCart',
      '/register': 'register',
      '/checkout': 'checkout'
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right menu item active
    //this.app.navbar.setActive(url);

    //Render correct navbar depending if you're logged in or not
<<<<<<< HEAD
   
    window.onload = () => this.renderNav();
=======
    //window.onload = () => this.renderCorrectNav();
>>>>>>> parent of bc84636... Merge branch 'develop' into kassa

    //Scroll to top of page
    window.scrollTo(0, 0);


  }

  startsidan(){
    $('title').text('CoffeeDB');
    $('.karusell').empty();
    $('main').empty();
    this.app.startsidan.render('.karusell', '2');
    this.app.startsidan.render('main');
    this.app.startsidan.callCarousel();
  }

  shoppingCart(){
    $('main').empty();
    this.app.cart.render('main', 'Basket');
    this.app.cart.renderShoppingList();
    this.app.cart.renderTotalPriceWithVAT();
  }

  register(){
    $('main').empty();
    this.app.profile.render('main', 'Register');
  }

  checkout(){
    $('main').empty();
    this.app.cart.render('main', 'CheckOut');
    this.app.cart.renderTotalPriceWithVAT();
    this.app.profile.render('.stepBox','Address');
  }



}

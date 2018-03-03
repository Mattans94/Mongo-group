class App extends Base{
    constructor(){
        super();
        this.rest= new REST();
        this.cart= new Cart(this.rest);
        
        this.changePage();
    }
   
    changePage(){
        let url = location.pathname;
        if (url == '/shoppingCart') {
            $('main').empty();
            this.cart.render('main','Basket');
            this.cart.renderShoppingList();
            this.cart.renderTotalPriceWithVAT();
    }

    
  
}
}
class Cart extends Base {
    constructor() {
        super();
        
    }

    renderShoppingList(){
        $('#shoppingList').empty();
        this.render('#shoppingList','ShoppingList');
    }
    renderTotalPriceWithVAT(){
        $('#order-total-price').empty();
        this.render('#order-total-price', 'OrderSummary');

    }
}
class Cart extends Base {
    constructor() {
        super();
        
    }

    renderShoppingList(){
        $('#shoppingList').empty();
        this.render('#shoppingList','ShoppingList');
    }
    renderTotalPriceWithVAT(){
        $('#order-summary').empty();
        this.render('#order-summary', 'OrderSummary');

    }
}
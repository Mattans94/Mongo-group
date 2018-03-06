class Cart extends REST {
    constructor(rest, profile) {
        super();
        this.rest = rest;
        this.profile = profile;
        this.clickEvents();
    }

    renderShoppingList() {
        $('#shoppingList').empty();
        this.render('#shoppingList', 'ShoppingList');
    }
    renderTotalPriceWithVAT() {
        $('#order-summary').empty();
        this.render('#order-summary', 'OrderSummary');

    }
    clickEvents() {
        let that = this;
        $(document).on("click", '.address-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".address-btn").addClass("active");
            $('.stepBox').empty();
            that.profile.render('.stepBox', 'Address');
        });
        $(document).on("click", '.delivery-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".delivery-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Delivery');
        });
        $(document).on("click", '.payment-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".payment-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Payment');

            // $.get('/getVisa', (data)=>{
            //     console.log(data);
            // });
        });
        $(document).on("click", '.review-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".review-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Review');
            that.renderShoppingList();
        });

        $('#pay-radio').on('change', function () {
            let chosen = $('input[name=radioName]:checked').val();
            console.log(chosen);
        });


    }

}

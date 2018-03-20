//Checkout class only used to render templates and get set all the variables
class Checkout extends REST {
    constructor(app) {
        super();
        this.app = app;
        this.lastOrder = null;
        this.clickEvents();
    }

    get firstName() {
        return `${this.firstname}`;
    }

    set firstName(val) {
        this.firstname = val;
    }

    get lastName() {
        return `${this.lastname}`;
    }

    set lastName(val) {
        this.lastname = val;
    }


    get street() {
        return `${this.streetName}`;
    }

    set street(val) {
        this.streetName = val;
    }

    get zip() {
        return `${this.postNumber}`;
    }

    set zip(val) {
        this.postNumber = val;
    }

    get region() {
        return `${this.country}`;
    }

    set region(val) {
        this.country = val;
    }

    get phoneNumber() {
        return `${this.telephone}`;
    }

    set phoneNumber(val) {
        this.telephone = val;
    }

    get deliveryMethod() {
        return `${this.dMethod}`;
    }

    set deliveryMethod(val) {
        this.dMethod = val;
    }

    get diliveryFee() {
        return `${this.dFee}`;
    }

    set deliveryFee(val) {
        this.dFee = val;

    }

    get paymentMethod() {
        return `${this.pMethod}`
    }
    set paymentMethod(val) {
        this.pMethod = val;
    }

    get orderNumber() {
        return `${this._orderNumber}`;
    }

    set orderNumber(val) {
        this._orderNumber = val;
    }

    get cardMonth() {
        return `${this._cardMonth}`;
    }

    set cardMonth(val) {
        this._cardMonth = val;
    }

    get cardYear() {
        return `${this._cardYear}`;
    }

    set cardYear(val) {
        this._cardYear = val;
    }

    get cvcCode() {
        return `${this._cvCode}`;
    }

    set cvcCode(val) {
        this._cvCode = val;
    }

    get cardNumber() {
        return `${this._cardNumber}`;
    }

    set cardNumber(val) {
        this._cardNumber = val;
    }

    get ort() {
        return `${this._ort}`;
    }

    set ort(val) {
        this._ort = val;
    }

    get orderDetails() {
        return `${this._orderDetails}`;
    }
    set orderDetails(val) {
        this._orderDetails = val;
    }


    keyupAddress(event) {
        if ($(event.target).hasClass('firstname')) {
            this.firstName = $(".firstname").val();
        }
        if ($(event.target).hasClass('lastname')) {
            this.lastName = $(".lastname").val();
        }
        if ($(event.target).hasClass('street')) {
            this.street = $(".street").val();
        }
        if ($(event.target).hasClass('zip')) {
            this.zip = $(".zip").val();
        }
        if ($(event.target).hasClass('country')) {
            this.country = $(".country").val();
        }
        if ($(event.target).hasClass('telephone')) {
            this.telephone = $(".telephone").val();
        }
        if ($(event.target).hasClass('ort')) {
            this.ort = $(".ort").val();
        }

    }


    keyupCreditCard(event) {
        if ($(event.target).hasClass('credit-card__number')) {
            this._cardNumber = $(".credit-card__number").val();
        }
        if ($(event.target).hasClass('credit-card__expiry-month')) {
            this._cardMonth = $(".credit-card__expiry-month").val();
        }
        if ($(event.target).hasClass('credit-card__expiry-year')) {
            this._cardYear = $(".credit-card__expiry-year").val();
        }
        if ($(event.target).hasClass('credit-card__cv-code')) {
            this._cvCode = $(".credit-card__cv-code").val();
        }

    }

    // clickPaypal(){
    //     $(document).on("click", "paypal-button", function(event){
    //         event.preventDefault();

    //     })
    // }




    clickEvents() {
        let that = this;
        $(document).on("click", '.address-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".address-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Address');
        });
        $(document).on("click", '.delivery-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".delivery-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Delivery');
            that.dMethod = "delivery1";
        });
        $(document).on("click", '.payment-btn', function () {
            that.dMethod = $('input[name="delivery"]:checked').val();
            let method = that.dMethod;// get delivery method
            that.calculateShipping(method);// get delivery fee
            that.pMethod = "paypal"; // if payment method has not been chosen, paypal is selected
            $(".checkOut-btns").removeClass("active");
            $(".payment-btn").addClass("active");
            $('.stepBox').empty();
            //TODO:has bug. Chosen delivery method can be reset after render template
            //radio button check function needed
            that.render('.stepBox', 'Payment');
            that.render('#myPay', 'Paypal');
        });
        $(document).on("click", '.review-btn', function () {
            // event.preventDefault();
            that.pMethod = $('input[name="payment"]:checked').val();
            //TODO: as above
            let ifCreditCard = that.pMethod;
            that.checkCreditCard(ifCreditCard);
            $(".checkOut-btns").removeClass("active");
            $(".review-btn").addClass("active");
            $('.stepBox').empty();

            that.render('.stepBox', 'Review');
            that.app.cart.renderShoppingList();
            that.app.cart.renderCartContent();
        });

        $(document).on("click", '.order-btn', async function (event) {
            event.preventDefault();
            await that.getShoppingCart();
            that.getOrderNumber();
            that.getOrderTime();
            Order.create(that.createOrder());

        });





    }

    clickPayment() {

        let that = this;
        $('#pay-radio').on('change', function () {
            that.pMethod = $('input[name="payment"]:checked').val();
            let topay = that.pMethod;
            that.toPay(topay);
        });

    }



    //-----------------------delivery ---------------------//
    calculateShipping(method) {
        if (method == "delivery1") {
            this.dFee = 0;
        }
        if (method == "delivery2") {
            this.dFee = 49;
        }
        if (method == "delivery3") {
            this.dFee = 99;
        }
    }
    //--------------------Order creater --------------------//
    createOrder() {
        let newOrder = {};
        newOrder.orderDetails = this._orderDetails;
        newOrder.user = this.app.currentUser;
        newOrder.orderNumber = this.getOrderNumber();
        newOrder.orderTime = this._orderTime;
        newOrder.product = "White Blouse Armani";
        newOrder.quantity = 1;
        newOrder.unitPrice = 10000;
        newOrder.total = 10000;
        newOrder.productVAT = 2500;
        newOrder.shippingMethod = this.dMethod;
        newOrder.shippingFee = this.dFee;
        newOrder.paymentMethod = this.pMethod;
        newOrder.cardNumber = this._cardNumber;
        newOrder.cardMonth = this._cardMonth;
        newOrder.cardYear = this._cardYear;
        newOrder.cvCode = this._cvCode;
        newOrder.firstName = this.firstname;
        newOrder.lastName = this.lastname;
        newOrder.street = this.streetName;
        newOrder.zip = this.postNumber;
        newOrder.ort = this._ort;
        newOrder.region = this.country;
        newOrder.phoneNumber = this.telephone;
        newOrder.status = "Beställt";
        console.log(newOrder);
        return newOrder;

    }
    //------------------Order Number/ Order Time Creater-------------------//
    getOrderNumber() {
        this._orderNumber = new Date().getTime();
        return this._orderNumber;
    }

    getOrderTime() {
        let month = new Date().getMonth() + 1;
        let date = new Date().getDate();
        let year = new Date().getFullYear();
        this._orderTime = month + "/" + date + "/" + year;

    }

    //-------------------Payment------------------------//

    toPay(chosen) {
        let that = this;
        if (chosen == "paypal") {
            $('#myPay').empty();
            that.render('#myPay', 'Paypal');
            this._cardNumber = "";
            this._cardMonth = "";
            this._cardYear = "";
            this._cvCode = "";
        }
        if (chosen == "credit-card") {
            $('#myPay').empty();
            that.render('#myPay', 'CreditCard');

        }
    }

    checkCreditCard(check) {
        if (check == "credit-card") {
            let exDate = `20${this._cardYear}/${this._cardMonth}`;
            let cardExp = new Date(exDate);
            if (cardExp == "Invalid Date"||cardExp < new Date()) {
                alert("Please check your credit card!");
            }
        }

    }


    getLastOrder() {
        return $.ajax('/getLastOrder').then((data) => {
            if (data.result && data.result.length > 0) {
                //this.lastOrder = data.result;
                let r = data.result[0];

                this.dMethod = r.shippingMethod;
                this.dFee = r.shippingFee;
                this.pMethod = r.paymentMethod;
                this._cardNumber = r.cardNumber;
                this._cardMonth = r.cardMonth;
                this._cardYear = r.cardYear;
                this._cvCode = r.cvCode;
                this.firstname = r.firstName;
                this.lastname = r.lastName;
                this.streetName = r.street;
                this.postNumber = r.zip;
                this.country = r.region;
                this.telephone = r.phoneNumber;
                this._ort = r.ort;
            } else {
                this.firstname = '';
                this.lastname = '';
                this._cardNumber = '';
                this._cardMonth = '';
                this._cardYear = '';
                this._cvCode = '';
                this.streetName = '';
                this.postNumber = '';
                this.country = '';
                this.telephone = '';
                this._ort = '';
            }
        });
    }

    async getShoppingCart() {
        console.log("get shopping cart")
        let session = Cart.getSessionId();
        let sessionProducts = await Cart.find({
            sessionId: session
        });
        let details = [];

        for (let obj of sessionProducts) {
            for (let prodObj of app.products) {
                if (obj.product == prodObj._id) {
                    prodObj.cartItem = obj;
                    let item = {};
                    item.productId = prodObj._id;
                    item.product = prodObj.name;
                    item.quantity = obj.quantity;
                    item.unitPrice = prodObj.price;
                    details.push(item);

                }
            }
        }
        this._orderDetails = details;

        console.log(this._orderDetails);

    }

}
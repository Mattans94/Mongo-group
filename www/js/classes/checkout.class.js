//Checkout class only used to render templates and get set all the variables
class Checkout extends REST {
    constructor(app) {
        super();
        this.app = app;
        this.lastOrder = null;
        this.clickEvents();
        this.subTotal = '';
        this.orderNumber;
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

    get email() {
        return `${this._email}`;
    }

    set email(val) {
        this._email = val;
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
        if ($(event.target).hasClass('email')) {
            this.email = $(".email").val();
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






    clickEvents() {
        let that = this;
        $(document).on("click", '.address-btn', function () {
            $(".checkOut-btns").removeClass("active");
            $(".address-btn").addClass("active");
            $('.stepBox').empty();
            that.render('.stepBox', 'Address');
            $('.payment-btn').attr('disabled', true);
            $('.review-btn').attr('disabled', true);
        });
        $(document).on("click", '.delivery-btn', function () {
            that.checkAddress();
        });
        $(document).on("click", '.payment-btn', function () {
            that.dMethod = $('input[name="delivery"]:checked').val();
            let method = that.dMethod;// get delivery method
            that.calculateShipping(method);// get delivery fee
            $(".checkOut-btns").removeClass("active");
            $(".payment-btn").addClass("active");
            $('.stepBox').empty();
            //TODO:has bug. Chosen delivery method can be reset after render template
            //radio button check function needed
            that.render('.stepBox', 'Payment');
            that.render('#myPay', 'Paypal');
            $('#order-summary').empty();
            that.renderShipping();
        });

        $(document).on("click", '.review-btn', function () {
            // event.preventDefault();
            that.pMethod = $('input[name="payment"]:checked').val();
            //TODO: as above
            let ifCreditCard = that.pMethod;
            that.checkCreditCard(ifCreditCard);

        });

        $(document).on("click", '.order-btn', async function (event) {
            event.preventDefault();
            await that.getShoppingCart();
            that.changeStock();
            that.getOrderNumber();
            that.getOrderTime();
            Order.create(that.createOrder());
            $("main").empty();
            that.render("main", 'Invoice');
            that.sendConfirmationMail();
            that.resetCart();

        });
    }

    async resetCart() {
        let sessionId = Cart.getSessionId();
        this._orderDetails.forEach(async obj => {
            let cartItem = await Cart.findOne({ product: obj.productId, sessionId });
            const item = new Cart(cartItem);
            await item.delete();
            Cart.updateCartBadgeValue();
            //Re-render cart content
            app.cart.renderCartContent();
        });
    }

    changeStock() {
        this._orderDetails.forEach(async obj => {
            const product = await Product.find({ _id: obj.productId });
            product[0].stock = product[0].stock - obj.quantity;
            const newProduct = new Product(product[0]);
            newProduct.save()
                .then(() => {
                    this.app.updateProducts();
                });
        });
    }


    sendConfirmationMail() {
        let correctMail;
        if (this.email) {
            correctMail = this.email;
        } else {
            correctMail = this.app.profile.email;
        }
        if (correctMail == this.app.profile.email && this.app.profile.email == "undefined@undefined") {
            this.app.profile.email = "coffedb@gmail.com";
            console.log("Kunde inte skicka bekräftelsemail -- användare inte inloggad.");
            console.log("Skickar bekräftelsemail till 'coffedb@gmail.com' istället.");
        }
        let sendmail = {
            url: '/sendmail',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify({ mail: correctMail, purchase: this._orderDetails, ordernumber: this.orderNumber }),
            processData: false,
            contentType: "application/json; charset=utf-8"
        };
        return $.ajax(sendmail);
    }


    clickPayment() {

        let that = this;
        $('#pay-radio').on('change', function () {
            that.pMethod = $('input[name="payment"]:checked').val();
            let topay = that.pMethod;
            that.toPay(topay);
        });

    }

    getEmail() {
        if (this.app.userEmail) {
            return this.app.userEmail;
        } else {
            return null;
        }
    }



    //-----------------------delivery ---------------------//
    calculateShipping(method) {
        if (method == "Hämta ut i butiken") {
            this.dFee = 0;
        }
        if (method == "Standard Hem Leverans") {
            this.dFee = 49;
        }
        if (method == "Express Hem Leverans") {
            this.dFee = 99;
        }
    }
    //--------------------Order creater --------------------//
    createOrder() {
        let newOrder = {};
        newOrder.orderDetails = this._orderDetails;
        newOrder.user = this.app.currentUser;
        newOrder.email = this.email;
        newOrder.orderNumber = this.orderNumber;
        newOrder.orderTime = this._orderTime;
        //newOrder.product = "White Blouse Armani";
        newOrder.quantity = this.app.navbar.qty;
        //newOrder.unitPrice = 10000;
        newOrder.total = this.app.cart.cartTotal + this.dFee;
        newOrder.productVAT = this.app.cart.VAT;
        newOrder.shippingMethod = this.dMethod;
        newOrder.shippingFee = this.dFee;
        newOrder.shippingVAT = this.dFee * 0.25;
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
        return newOrder;

    }
    //------------------Order Number/ Order Time Creater-------------------//
    getOrderNumber() {
        this.orderNumber = new Date().getTime();
        return this.orderNumber;
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
        let cardExp = new Date(2000 + this._cardYear, this._cardMonth);
        let checkNumber = /\d{16}$/.test(this._cardNumber);
        let checkCVC = /\d{3}$/.test(this.__cvCode);
        if (check == "credit-card") {
            if (cardExp == "Invalid Date" || cardExp < new Date() || !checkNumber || !checkCVC) {
                alert("Please check your credit card!");
            } else {
                $(".checkOut-btns").removeClass("active");
                $(".review-btn").addClass("active");
                $('.stepBox').empty();
                this.render('.stepBox', 'Review');
                this.app.cart.renderShoppingList();
                this.app.cart.renderCartContent();
            }
        }
        if (check == "paypal") {
            $(".checkOut-btns").removeClass("active");
            $(".review-btn").addClass("active");
            $('.stepBox').empty();
            this.render('.stepBox', 'Review');
            this.app.cart.renderShoppingList();
            this.app.cart.renderCartContent();
        }

    }
    checkAddress() {
        let flag = true;
        $("input.form-control ").map((index, element) => {
            if ($(element).val().length == 0) {
                flag = false;
            }
        });
        if (flag) {
            $(".checkOut-btns").removeClass("active");
            $(".delivery-btn").addClass("active");
            $('.stepBox').empty();
            this.render('.stepBox', 'Delivery');
            this.dMethod = "Hämta ut i butiken";
            this.pMethod = "paypal"; // if payment method has not been chosen, paypal is selected
        } else {
            alert("Please complete the form!")
        }

    }



    getLastOrder() {
        return $.ajax('/getLastOrder').then((data) => {
            if (data.result && data.result.length > 0) {
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
                this._email = r.email;
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
                this._email = '';
            }
        });
    }

    async getShoppingCart() {
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
    }

    renderShipping() {
        let that = this;
        that.app.cart.render('#order-summary', 'OrderSummary');
        that.app.cart.render('#total-without-shipping', 'TotalPrice');
        $('.before-shipping').empty();
        that.subTotal = that.app.cart.cartTotal + that.dFee;
        $('.shipping-Fee').append(`<td>Fraktavgift</td>
              <th>${that.dFee}kr</th>`);
        $('.shipping-vat').append(`<td >Fraktmoms 25%</td>
              <th>${that.dFee * 0.25}kr</th>`);
        $('.addShipping').append(`<td>Total</td>
              <th>${that.subTotal}kr</th>`);
    }


}
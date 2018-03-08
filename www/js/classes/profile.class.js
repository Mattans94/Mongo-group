class Profile extends REST {
    constructor(rest, cart) {
        super();
        this.rest=rest;
        this.cart=cart;
        //this.changeInput();
    }

    get email() {
        return `${this.usName}@${this.web}`;
    }

    get password() {
        return `${this.pass}`;
    }

    get firstName() {
        return `${this.firstname}`;
    }

    get street() {
        return `${this.streetName}`;
    }

    get zip(){
        return`${this.postNumber}`;
    }

    set email(val) {
        //email address control
        val = val.split('@');
        if (val.length == 2) {
            // user name as JSON file name
            this.usName = val[0];
            this.web = val[1];
            $(".signUpEmail").parent().removeClass("has-warning");
            $(".signupbtn").prop("disabled", false);
            $(".lginEmail").parent().removeClass("has-warning");
        }
        else {
            $(".lginEmail").parent().addClass("has-warning");
            $(".signUpEmail").parent().addClass("has-warning");
            $(".signupbtn").prop("disabled", true);
        }
    }

    set password(val) {
        if (this.validate(val)) {
            this.pass = val;
            $(".passControl").addClass("d-none");
            $(".signupbtn").prop("disabled", false);
        } else {
            $(".signupbtn").prop("disabled", true);
        }
    }

    set firstName(val) {
        this.firstname = val;
    }

    set street(val) {
        this.streetName = val;
    }

    set zip(val){
        this.postNumber=val;
    }

    set Region(val){
        this.country=val;
    }
    // get data from login modal and register page
    keyuplogin(event) {
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }
    // get data from register page
    keyupRegister(event) {
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
            console.log(this.email);
        }
        if ($(event.target).hasClass('signUpPass')) {
            this.password = $(".signUpPass").val();
        }
        if ($(event.target).hasClass('signUpRePass')) {
            this.repass = $(".signUpRePass").val();
        }
       
    }

    //data from address page
    keyupAddress(event){
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
        

    }
    //change login modal
    changelogin() {
        $('.lginEmail').on('change', function () {
            this.email = $(".lginEmail").val();
        });
        $('.signUpEmail').on('change', function () {
            this.email = $(".signUpEmail").val();
        });
      
    }
    //change register page
    changeRegister() {
        $('.lginEmail').on('change', function () {
            this.email = $(".lginEmail").val();
        });
        $('.signUpEmail').on('change', function () {
            this.email = $(".signUpEmail").val();
        });
    }


    clicklogin(event, element, instance) {
        if ($(event.target).hasClass('lgin')) {
            this.checkLogin(this.usName);
        }
    }

    checkLogin(jsonName, callbackFunc) {
        // Looking for JSON file name as this.usName
        JSON._load('/users/' + jsonName).then(
            (data) => {
                if (data.password == this.password) {
                    callbackFunc && callbackFunc();
                    this.login();
                    $('#loginModal').modal('toggle');
                } else {
                    $('.loginFail').removeClass('d-none');
                }
            },
            (error) => {
                $('.noUserName').removeClass('d-none');
            }
        );

    }
    login() {
        let that = this;
        app.getCurrentUser(that.usName);
        app.showUSname();
        JSON._save('currentUser', { userName: that.usName });
        $('#loginForm')[0].reset();
        $(".navbar-collapse").collapse('hide');
    }

    clickRegister(event, element, instance) {
        if ($(event.target).hasClass('cancelbtn')) {
            $('#signupModal').modal('toggle');
        }
        if ($(event.target).hasClass('signupbtn')) {
            if (!this.usName) {
                alert('Ange mailadress, tack!');
            } else {
                this.sign();
            }

        }
    }

    sign() {
        if (this.checkPass()) {
            try {
                JSON._save('/users/' + this.usName, { email: this.email, password: this.password });
                this.login();
                $('#signupModal').modal('toggle');
                $('#signupForm')[0].reset();
            }
            catch (e) {
                alert("System fail!");
            }
        }
    }

    checkPass() {
        //check passwords
        if (this.password !== this.repass) {
            $('.repassCheck').removeClass('d-none');
            return false;
        } else if (!$('.tAndP').prop('checked')) {
            //check box
            $('.checkIt').removeClass('d-none');
            return false;
        } else {
            return true;
        }
    }

    validate(password) {
        return /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)\w{6,}$/.test(password);
    }



    toggleLoginModal() {
        let that = this;
        that.render('.modal-container-login', 'login');
        $('#loginModal').modal('toggle');

    }

}
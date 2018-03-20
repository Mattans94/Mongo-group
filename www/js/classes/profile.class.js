//Profile class only use for render and get, set 
class Profile extends Base {
    constructor(app) {
        super();
        this.app = app;

        //this.changeInput();
    }

    get email() {
        return `${this.usName}@${this.web}`;
    }

    get password() {
        return `${this.pass}`;
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
        this.pass = val;
    }

    get name() {
        return `${this._name}`;
    }

    set name(val) {
        this._name = val;
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
        if ($(event.target).hasClass('userName')) {
            this.name = $(".userName").val();
        }
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
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
            console.log(this.password);
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
            this.finishLogin();
             //event.preventDefault();
             $('#loginModal').modal('toggle');
        }
        if ($(event.target).hasClass('register-btn')) {
            $('#loginModal').modal('hide');
            location.replace("/register");
            //location.reload();
        }
    }




    login() {
        let login = {
            url: '/login',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(this.sendLoginInfo()),
            processData: false,
            contentType: "application/json; charset=utf-8"
        };
        return $.ajax(login);
    }
    
    finishLogin() {
           let that = this;
           that.login().then((res) => {
               console.log("res " + res.result);
               alert(res.message);
               $('header').empty();
               that.app.navbar.render('header');
               that.app.navbar.changeLoginBtn();
               //location.reload();
               // that.app.navbar.changeLoginBtn();
           });
       }

    clickRegister(event, element, instance) {
        if ($(event.target).hasClass('signupbtn')) {
            this.sign().then(function () {
                alert("You are now registed!");
            }).then(() => {
                this.finishLogin();
            })

        }
        if ($(event.target).hasClass('lgin')) {
            this.finishLogin();
        }
    }

    sign() {
        let register = {
            url: '/register',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(this.createUser()),
            processData: false,
            contentType: "application/json; charset=utf-8"
        };
        return $.ajax(register);
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

    sendLoginInfo(){
        let loginUser={};
        loginUser.password = this.password;
        loginUser.email = this.email;
        console.log(loginUser);
        return loginUser;
    }

    createUser() {
        let newUser = {};
        newUser.email = this.email;
        newUser.password = this.password;
        newUser.name = this.name;
        newUser.role = "Normal User";
            console.log(newUser);
        return newUser;
    }

    getUserInfo() {
        return $.ajax('/user').then((data) => {
            if (data.result && data.result.length > 0) {
                //this.lastOrder = data.result;
                let r = data.result[0];

                this.name = r.name;
                this.email = r.email;
                this.password = r.password;
            }
        });
    }

  




}
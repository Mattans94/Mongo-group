//Profile class only use for render and get, set 
class Profile extends Base {
    constructor(rest, cart) {
        super();
        this.rest = rest;
        this.cart = cart;
        this.currentUser = "Unknow User";
        this.clickSign();
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


    // clicklogin(event, element, instance) {
    //     if ($(event.target).hasClass('lgin')) {
    //         //this.finishLogin();
    //         event.preventDefault();
    //     }
    // }

    clickSign(){
        $('button').click(async function(){
            let email, password, propsToChange;
            let demo = $(this).text();
            if(['logga in', 'Registrera'].includes(demo)){
              email = prompt(this.email);
              password = prompt(this.password);
            }
            if(demo == 'change'){
              propsToChange = {password: prompt(this.password)};
            }
            let result = await UserHandler[demo](
              propsToChange || email, password
            );
            $('pre').text(
              'Result:\n' + JSON.stringify(result,'','  ') + '\n\n' +
              'Info:\n' + JSON.stringify(result.info,'','  ')
            );
          });
        
          $('button').first().click();
    }
  
   




    login() {
        let login = {
            url: '/login',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(this.createUser()),
            processData: false,
            contentType: "application/json; charset=utf-8"
        };
        return $.ajax(login);
    }


    finishLogin() {
        this.login().then((res) => {
            console.log("res " + res.result);
            this.currentUser=res.result;
        });
    }

    // clickRegister(event, element, instance) {
    //     if ($(event.target).hasClass('cancelbtn')) {
    //         $('#signupModal').modal('toggle');
    //     }
    //     if ($(event.target).hasClass('signupbtn')) {
    //         this.sign().then(function () {
    //             alert("You are now registed!");
    //         }).then(() => {
    //             this.finishLogin();
    //         })

    //     }
    //     if ($(event.target).hasClass('lgin')) {
    //         this.finishLogin();
    //     }
    // }

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

    createUser() {
        let newUser = {};
        newUser.email = this.email;
        newUser.password = this.password;
        newUser.name = this.name;
        console.log(newUser);
        return newUser;
    }




}
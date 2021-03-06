//Profile class only use for render and get, set
class Profile extends Base {
    constructor(app) {
        super();
        this.app = app;
        this.clickLogout();
        //this.render('.modal-container-login', 'login');
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

    getOneOf(selector){
        let first = $($(selector)[0]).val();
        let second = $($(selector)[1]).val();

        return first || second;
    }


    // get data from login modal and register page
    keyuplogin(event) {
        if ($(event.target).hasClass('lginEmail')) {
            this.email = this.getOneOf('.lginEmail');

        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = this.getOneOf('.lgPass');
        }
    }
    // get data from register page
    keyupRegister(event) {
        if ($(event.target).hasClass('userName')) {
            this.name = $(".userName").val();
        }
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
        }
        if ($(event.target).hasClass('signUpPass')) {
            this.password = $(".signUpPass").val();
        }
        if ($(event.target).hasClass('signUpRePass')) {
            this.repass = $(".signUpRePass").val();
        }
        if ($(event.target).hasClass('lginEmail')) {
            this.email = this.getOneOf('.lginEmail');
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = this.getOneOf('.lgPass');
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
        let that=this;
        $(document).on('hide.bs.modal', () =>{
          $('.modal-backdrop').remove();
        });
        if ($(event.target).hasClass('lgin')) {
            that.finishLogin();
        }
        if ($(event.target).hasClass('register-btn')) {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        }
    }

    clickLogout(){
      $(document).on('click', '.logout', () =>{
        this.logout();
      });
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
            if(res.result){
                app.currentUser=res.result;
                $('.loginModal').modal('toggle');
                location.replace('/produkter');
            }else{
                alert(res.message);
            }
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
        if($('.modal-container-login .loginModal').length==0){
            that.render('.modal-container-login', 'login');
        }
        $('.loginModal').modal('toggle');

    }

    sendLoginInfo(){
        let loginUser={};
        loginUser.password = this.password;
        loginUser.email = this.email;
        return loginUser;
    }

    createUser() {
        let newUser = {};
        newUser.email = this.email;
        newUser.password = this.password;
        newUser.name = this.name;
        newUser.role = "Normal User";
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


    async logout(){
      await Logout.find('');
      document.cookie='user'+'=';
      document.cookie='role'+'=';
      document.cookie='email'+'=';
      location.replace('/');
    }






}

class Navbar extends REST {
  constructor(app) {
    super();
    this.app = app;
    this.items = [
      new NavbarItem('Startsidan', '/'),
      new NavbarItem('Produkter', '/produkter'),
      new NavbarItem('Om oss', '/om_oss'),
      new NavbarItem('Köpvillkor', '/kopvillkor')
    ];
    // this.LogginBtnForNormalUser();
    // this.LogginBtnForAdmin();
    this.changeLoginBtn();
  }

  setActive(url) {
    for (let item of this.items) {
      item.active = url == item.url;
    }
  }

  changeLoginBtn() {
    let that = this;
    $(document).on('click', '.pop', () => {
      $('.modal-container-login').empty();
      $('.modal').modal('hide');   // Close the modal after login
      console.log('User:', that.app.currentUser)
      console.log('normal user: ', that.app.getRole)

      if (that.app.currentUser == 'Test') {
        that.app.navbar.render('.modal-container-login', 3);
        console.log('normal: ', that.app.getRole)
      }

      else if (that.app.currentUser == 'Admin') {
        this.app.navbar.render('.modal-container-login', 4);
        console.log('admin: ', this.app.getRole)
      }

      //  if (this.app.checkIfLogin()) { 
      //  this.app.navbar.render('.modal-container-login', 2);
      //  }


      // if (that.app.getRole == 'Normal User') {
      //   that.app.navbar.render('.modal-container-login', 3);
      //   console.log('normal: ', that.app.getRole)
      // }

    });
  }
}




  // LogginBtnForNormalUser() {
  //   let that = this;
  //   $(document).on('click', '.pop', () => {
  //     this.changeLoginBtn();
  //     $('.modal').modal('hide');   // Close the modal after logg in
  //     // location.href = "/mina_sidor";  // Link to mina_sidor

  //     console.log('User:', that.app.currentUser)

  //     //   $('#loginModalToggle').replaceWith(function () {
  //     //     $('#loginModalToggle').replaceWith(`<div class="dropdown">
  //     //   <button class="btn dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //     //     <i class="far fa-user"></i>
  //     //     ${that.app.currentUser} 
  //     //   </button>
  //     //   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  //     //     <a class="dropdown-item" href="#"></a>
  //     //     <a class="dropdown-item" href="/mina_sidor" id="myPage">Mina sidor</a>
  //     //     <a class="dropdown-item" href="/">Logga ut
  //     //       <i class="fas fa-sign-out-alt ml-1 fa-lg"></i>
  //     //     </a>
  //     //   </div>
  //     // </div>`)
  //     //   });
  //   });
  // }


  // LogginBtnForAdmin() {
  //   let that = this;
  //   $(document).on('click', '.pop', () => {
  //     $('.modal').modal('hide');   // Close the modal after logg in
  //     // location.href = "/admin";  // Link to admin
  //     // $('.pop').attr('href', '/admin');

  //     console.log('User:', that.app.currentUser)

  //     //   $('#loginModalToggle').replaceWith(function () {
  //     //     $('#loginModalToggle').replaceWith(`<div class="dropdown">
  //     //   <button class="btn dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //     //     <i class="far fa-user"></i>
  //     //     ${that.app.currentUser} 
  //     //   </button>
  //     //   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  //     //     <a class="dropdown-item" href="#"></a>
  //     //     <a class="dropdown-item" href="/admin" id="myPage">Admin sidor</a>
  //     //     <a class="dropdown-item" href="/">Logga ut
  //     //       <i class="fas fa-sign-out-alt ml-1 fa-lg"></i>
  //     //     </a>
  //     //   </div>
  //     // </div>`)
  //     //   });
  //   });

  // }

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
    this.changeLoginBtn();
  }

  setActive(url) {
    for (let item of this.items) {
      item.active = url == item.url;
    }
  }

  changeLoginBtn() {
    let that = this;
    // $(document).on(‘click’, ‘.pop’, () => {
    $('.modal-container-login').empty();
    // $(‘.modal’).modal(‘hide’);   // Close the modal after login
    // console.log(‘User:’, that.app.currentUser)
    // console.log(‘normal user: ‘, that.app.getRole)
    let user = that.getUserRole();
    if (!user) {
      that.render('.modal-container-login', 2);
      // this.app.navbar.render('.modal-container-login', 2);
    } else if (user == 'Admin') {
      that.render('.modal-container-login', 4);
      console.log('admin: ', user);
    } else {
      that.render('.modal-container-login', 3);
      console.log('normal: ', user);
    }
  }

  getUserName() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }

  getUserRole() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }

}

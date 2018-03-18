class Navbar extends REST{
  constructor(app){
    super();
    this.app = app;
    this.items = [
      new NavbarItem('Startsidan', '/'),
      new NavbarItem('Produkter', '/produkter'),
      new NavbarItem('Om oss', '/om_oss'),
      new NavbarItem('Köpvillkor', '/kopvillkor')
    ];
  }

  setActive(url){
    for(let item of this.items){
      item.active = url == item.url;
    }
  }

  


  
  templateLogginButton() {
    <button id="loginModalToggle" class="btn">Logga in<i class="fas fa-sign-in-alt ml-1 fa-lg"></i></button>
  }
  

  templateNormalUser() {
    
    <div class="dropdown">
    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="far fa-user"></i>
        ${this.app.currentUser}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#"></a>
      <a class="dropdown-item" href="/mina_sidor">Mina sidor</a>
      <a class="dropdown-item" href="/">Logga ut<i class="fas fa-sign-out-alt ml-1 fa-lg"></i></a>
    </div>
  </div>

  }

 


    // change the text of the login button (user/admin)
    // change the url (user: mina_sidor, admin: admin )
    // dropdown button (mina sidor, log out)



    // Change button if user log in


    // changeButton() {
    //   // let that = this;
    //   // let user = that.app.currentUser
    //   if(nej) { return }

    //   else if (normal) {
    //   //   this.app.
    //   }
    //   else if(admin) {

    //   }

    // }





}

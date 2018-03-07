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
}

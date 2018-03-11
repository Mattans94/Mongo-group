class Product extends REST{
  constructor(app){
    super();
    this.app = app;
    this.products = [];
    this.products.push(
      ...this.app.beans,
      ...this.app.powders,
      ...this.app.capsules
    );
    console.log(this.products);
  }
  
}

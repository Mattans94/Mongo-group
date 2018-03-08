const app = new App();

async function addProduct(){
  let product = await Bean.findOne({
    _id: '5a9ff589bdc52625d3c7ecd3'
  });
  let anotherProd = await Bean.findOne({
    _id: '5a9ff589bdc52625d3c7ecdd'
  });
  let productIns = new Product(app);
  let aProd = new Product(app);
  console.log(product);
  Object.assign(productIns, product);
  Object.assign(aProd, anotherProd);
  console.log(productIns);
  await app.cart.addProductToArray(productIns);
  await app.cart.addProductToArray(aProd);
  // Object.assign(app.cart.products, localStorage.getItem('Cart'));
}

addProduct();




// async function test() {

//   // test get beans which quantity is 500g
//   const beans = await Bean.find({
//     quantity: 500
//   });
//   console.log('Beans are', beans);

//   // test get all powders
//   const powders = await Powder.find({});
//   console.log('Powders are', powders);

//   // test populate with tools
//   const capsules = await Capsule.find({
//     name: /^M/g,
//     populate: 'tools'
//   });
//   console.log('Capsules are', capsules);
// }

// test();

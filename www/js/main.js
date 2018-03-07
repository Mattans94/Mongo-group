const app = new App();

async function addProduct(){
  let product = await Bean.findOne({
    _id: '5a9e673c272733142767ff3c'
  });
  let productIns = new Product(app);
  console.log(product);
  Object.assign(productIns, product);
  console.log(productIns);
  app.cart.addProductToArray(productIns);
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

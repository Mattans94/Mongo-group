function request(entity, reqMethod, query, body, callback){

  let reqObj = {
    url: `/${entity}/${query}`, // entity for example "books"
    method: reqMethod, // POST, GET, PUT, DELETE
    dataType: 'json', // I except JSON back from the server
    data: JSON.stringify(body), // JSON to send to server
    processData: false, // do not try to convert the data...
    // set the content type the server expects
    // to tell it we are sending json
    contentType: "application/json; charset=utf-8",
    // the callback function to call after recieving data
    // from the server
    success: callback
  };

  if(reqMethod != "POST" && reqMethod != "PUT"){
    delete reqObj.data;
  }

  $.ajax(reqObj);


}

function test(){

  // Test of get
  request('books', 'GET', 'author=Thomas Mann', false, (data) => {
    console.log(data);
  });

  // Test 2 of get
  request('books', 'GET', '5a952e9095dcddb36f0fbb82', false, (data) => {
    console.log(data);
  });

  // Test of POST (create a book)
  request('books', 'POST', '', {
    author: "Clownen Jack",
    country: "Sweden",
    imageLink: "images/jacks_memoarer.jpg",
    language: "Swedish",
    link: "https://en.wikipedia.org/wiki/jacks_memoarer",
    pages: 210,
    title: "Clownen Jacks memoarer",
    year: 2030
  }, (data) => {
    console.log(data);
  });

  // Test of update (update two books)
  request('books', 'PUT', 'author=Thomas Mann', {
    author: 'Thomas Superman'
  }, (data) => {
    console.log(data);
  })

  // Test of delete
  // remove all (1) books written by
  // Joseph Conrad
  request('books', 'DELETE', 'author=Joseph Conrad', false, (data) => {
    console.log(data);
  });

}

function start(){
  $.ajax({
    url: '/import/books',
    success: (data) => {
      console.log("Reset of database", data);
      // Now run our tests
      test();
    }
  });
}

start();




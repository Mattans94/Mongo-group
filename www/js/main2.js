async function test(){

  // let newAuthor = await Author.create({
  //   name: 'Pia Bengtsson',
  //   description: 'Pia skriver om det ofattbara...'
  // });
  //
  // let newBook = await Book.create({
  //   "author": newAuthor._id,
  //   "country": "Sverige",
  //   "imageLink": "",
  //   "language": "Danish",
  //   "link": "",
  //   "pages": 249,
  //   "title": "Mysterier i vardagen",
  //   "year": 2017
  // });
  //
  // newAuthor.books.push(newAuthor._id);
  // newAuthor.save();

  let author = await Author.find('name[$regex]=Pia');
  console.log(author);
}

test();

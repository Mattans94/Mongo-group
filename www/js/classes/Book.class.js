class Book extends REST {

  sayHi(){
    return `Hi! I am the book ${this.title}. I was written in ${this.year} by ${this.author}!`
  }

}
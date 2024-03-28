'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },
  containerOf: {
    bookList: '.books-list',
    bookListImages: '.book__image',
  }
}

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
}

function render(){
  for(let bookId in dataSource.books){
    const bookParam = dataSource.books[bookId];

    /* generate HTML based on template */
    const generatedHTML = templates.bookTemplate({
      id: bookParam.id,
      name: bookParam.name,
      price: bookParam.price,
      rating: bookParam.rating,
      image: bookParam.image
    });

    /* create element using utils.createElementFromHTML */
    const elem = utils.createDOMFromHTML(generatedHTML);

    /* find book container */
    const bookContainer = document.querySelector(select.containerOf.bookList);

    /* add element to book container */
    bookContainer.appendChild(elem);
  }
}
render();

const favouriteBooks = [];

function initActions(){
  const bookList = document.querySelectorAll(select.containerOf.bookListImages);

  for(let book of bookList){
    book.addEventListener('dblclick', function(event){
      event.preventDefault();
      book.classList.add("favorite");
      const bookId = book.getAttribute("data-id");
      favouriteBooks.push(bookId);
    })
  }
}

initActions();
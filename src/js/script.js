'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },
  containerOf: {
    bookList: '.books-list',
    bookListImages: '.book__image',
    filters: '.filters',
  }
}

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
}

const favoriteBooks = [];
const filters = [];

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

function initActions(){
  const bookContainer = document.querySelector(select.containerOf.bookList);

  bookContainer.addEventListener('dblclick', function(event){
    event.preventDefault();
    if(event.target.offsetParent.classList.contains('book__image')){

      const bookLink = event.target.offsetParent
      const bookId = bookLink.getAttribute("data-id");

      if(!favoriteBooks.includes(bookId)){
        bookLink.classList.add("favorite");
        favoriteBooks.push(bookId);
      } else {
        const indexOfBook = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBook, 1);
        bookLink.classList.remove("favorite");
      }
    }
  })

  const filterContainer = document.querySelector(select.containerOf.filters);

  filterContainer.addEventListener('click', function(event){
    const target = event.target;
    if(target.nodeName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter'){
      if(!target.checked){
        const indexOfValue = filters.indexOf(target.value);
        filters.splice(indexOfValue, 1);
      } else {
        filters.push(target.value);
      }
    }

    filterBooks();
  })
}
initActions();

function filterBooks(){

  for(const book of dataSource.books){
    let shouldBeHidden = false; 
    const filterBook = document.querySelector(select.containerOf.bookListImages + '[data-id = "' + book.id + '"]');

    for(const filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
  
    if(shouldBeHidden){
      filterBook.classList.add("hidden");
    } else {
      filterBook.classList.remove("hidden");
    }
  }
}
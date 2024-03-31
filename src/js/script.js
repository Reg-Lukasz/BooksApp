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

class BooksList {
  constructor(){
    const thisBook = this;
    
    thisBook.initData();
    thisBook.getElements();
    thisBook.render();
    thisBook.initActions();
  }

  initData(){
    const thisBook = this;

    thisBook.data = dataSource.books;
    thisBook.favoriteBooks = [];
    thisBook.filters = [];
  }

  getElements(){
    const thisBook = this;

    thisBook.bookContainer = document.querySelector(select.containerOf.bookList);
    thisBook.filterContainer = document.querySelector(select.containerOf.filters);
  }

  render(){
    const thisBook = this;

    for(let bookId in thisBook.data){
      const bookParam = thisBook.data[bookId];

      const ratingWidth = bookParam.rating * 10;
      const ratingBgc = thisBook.determineRatingBgc(bookParam.rating);

      /* generate HTML based on template */
      const generatedHTML = templates.bookTemplate({
        id: bookParam.id,
        name: bookParam.name,
        price: bookParam.price,
        rating: bookParam.rating,
        image: bookParam.image,
        ratingWidth: ratingWidth,
        ratingBgc: ratingBgc,
      });

      /* create element using utils.createElementFromHTML */
      const elem = utils.createDOMFromHTML(generatedHTML);

      /* find book container */
      const bookContainer = document.querySelector(select.containerOf.bookList);

      /* add element to book container */
      bookContainer.appendChild(elem);
    }
  }

  initActions(){
    const thisBook = this;

    thisBook.bookContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')){
  
        const bookLink = event.target.offsetParent
        const bookId = bookLink.getAttribute("data-id");
  
        if(!thisBook.favoriteBooks.includes(bookId)){
          bookLink.classList.add("favorite");
          thisBook.favoriteBooks.push(bookId);
        } else {
          const indexOfBook = thisBook.favoriteBooks.indexOf(bookId);
          thisBook.favoriteBooks.splice(indexOfBook, 1);
          bookLink.classList.remove("favorite");
        }
      }
    })

    thisBook.filterContainer.addEventListener('click', function(event){
      const target = event.target;
      if(target.nodeName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter'){
        if(!target.checked){
          const indexOfValue = thisBook.filters.indexOf(target.value);
          thisBook.filters.splice(indexOfValue, 1);
        } else {
          thisBook.filters.push(target.value);
        }
      }

      thisBook.filterBooks();
    })
  }

  filterBooks(){
    const thisBook = this;

    for(const book of thisBook.data){
      let shouldBeHidden = false;
      const filterBook = document.querySelector(select.containerOf.bookListImages + '[data-id = "' + book.id + '"]');
  
      for(const filter of thisBook.filters){
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

  determineRatingBgc(rating){
    let background = '';
  
    if (rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  
    return background;
  }
}

const app = new BooksList();
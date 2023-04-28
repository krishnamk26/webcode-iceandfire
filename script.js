let div1 = document.createElement("div");
document.body.append(div1)
div1.className = "main"



let input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "search");
input.setAttribute("name", "search");
input.placeholder = "Enter Book Name";
input.setAttribute("list", "datalist");
input.className="input-ele"


let suggestionBox = document.createElement("datalist");
suggestionBox.id = "datalist";

let linebreak = document.createElement("br");

let button = document.createElement("button");
button.setAttribute("id", "search-button");
button.innerHTML = "Search"

div1.append(input, linebreak, button,)
div1.append(suggestionBox)

let div = document.createElement("div")
div.setAttribute("id", "books-container")
div1.appendChild(div)

async function fetchBooks() {
  try {
    const response = await fetch('https://www.anapioficeandfire.com/api/books');
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    //console.error(error);
    alert(err);
  }
}

(async () => {
  let res = await fetch("https://anapioficeandfire.com/api/books");
  let books = await res.json();
  let suggestion = document.getElementById("datalist");
  books.map((book) => {
    let option = document.createElement("option");
    option.value = book.name;
    suggestion.appendChild(option);
  });
})();

function renderBooks(booksData) {
  let booksContainer = document.getElementById('books-container');
  booksContainer.innerHTML = '';

  booksData.slice(0, 10).forEach(async (book) => {
    let bookElement = document.createElement('div');
    bookElement.className="book-ele"
    let nameElement = document.createElement('h2');
    let isbnElement = document.createElement('p');
    let pagesElement = document.createElement('p');
    let authorsElement = document.createElement('p');
    let publisherElement = document.createElement('p');
    let releasedElement = document.createElement('p');


    nameElement.textContent = book.name;
    isbnElement.textContent = `ISBN: ${book.isbn}`;
    pagesElement.textContent = `Number of Pages: ${book.numberOfPages}`;
    authorsElement.textContent = `Authors: ${book.authors.join(', ')}`;
    publisherElement.textContent = `Publisher: ${book.publisher}`;
    releasedElement.textContent = `Released: ${book.released}`;



    book.characters.slice(0, 5).forEach(async characterUrl => {
      try {
        let response = await fetch(characterUrl);
        let data = await response.json();
        let character = document.createElement('p');
        character.textContent = `Character Name : ${data.name}`;
        bookElement.appendChild(character);
      } catch (error) {
        //console.log(error);
        alert(err);
      }
    });

    bookElement.appendChild(nameElement);
    bookElement.appendChild(isbnElement);
    bookElement.appendChild(pagesElement);
    bookElement.appendChild(authorsElement);
    bookElement.appendChild(publisherElement);
    bookElement.appendChild(releasedElement);

    booksContainer.appendChild(bookElement);

  });
}

function filterBooks(booksData, query) {
  return booksData.filter((book) => {
    let bookName = book.name.toLowerCase();
    return bookName.includes(query);
  });
}

let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async () => {
  let searchInput = document.getElementById('search');
  let query = searchInput.value.toLowerCase();

  let booksData = await fetchBooks();
  let filteredBooks = filterBooks(booksData, query);
  renderBooks(filteredBooks);
});

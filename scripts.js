function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggle = function() {
    if (this.read === 0) {
      this.read = 1;
    } else {
      this.read = 0;
    }
  }
}


let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function clearTable() {
  let table = document.querySelector("table");
  let rows = table.rows;

  while (rows.length > 1) {
    table.deleteRow(1);
  }
}

function countPrecedingRows(element) {
  let counter = 0;
  while (element = element.previousElementSibling) {
    counter++;
  }
  return counter;
}

function displayBooks(myLibrary) {
  let table = document.querySelector("table");

  for (let book of myLibrary) {
    let bookRow = document.createElement("tr");

    let bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;

    let bookPages = document.createElement("td");
    bookPages.textContent = book.pages;

    let bookRead = document.createElement("td");
    if (book.read === 0) {
      bookRead.textContent = "Not Read Yet";
    } else {
      bookRead.textContent = "Read";
    }

    let bookToggle = document.createElement("button");
    bookToggle.textContent = "Toggle";
    bookToggle.className = "toggle-button";

    let bookDelete = document.createElement("button");
    bookDelete.textContent = "Delete";
    bookDelete.className = "delete-button";

    bookRow.append(bookTitle, bookAuthor, bookPages, bookRead, bookToggle, bookDelete);
    table.appendChild(bookRow);

    bookToggle.addEventListener("click", function() {
      let bookIndex = (countPrecedingRows(bookRow)) - 1;
      myLibrary[bookIndex].toggle();
      clearTable();
      displayBooks(myLibrary);
    })

    bookDelete.addEventListener("click", function() {
      let bookIndex = (countPrecedingRows(bookRow)) - 1;
      myLibrary.splice(bookIndex, 1);
      clearTable();
      displayBooks(myLibrary);
    })
  }
}

let newBookButton = document.querySelector(".new-button");
let newBookDialog = document.querySelector(".new-dialog");
let newBookForm = document.querySelector("#new-form");

newBookButton.addEventListener("click", function() {
  newBookDialog.showModal();
})

newBookForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let title = document.querySelector("#new-title");
  let author = document.querySelector("#new-author");
  let pages = document.querySelector("#new-pages");
  let read = document.querySelector("#new-read");

  if (read.value.toLowerCase() === "no") {
    read = 0;
  } else if (read.value.toLowerCase() === "yes") {
    read = 1;
  }
  
  let newBook = new Book(title.value, author.value, pages.value, read);
  addBookToLibrary(newBook);
  clearTable();
  displayBooks(myLibrary);

  title.value = "";
  author.value = "";
  pages.value = "";
  read.value = "";
  newBookDialog.close();
})
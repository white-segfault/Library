// The library object
function library() {
  this.bookContent = [];
  this.displayed = 0; // number of books currently displayed
  this.myTable; // table display for the library
}

// The book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    const readStatus = this.read ? "have read" : "not read yet";
    let bookInfo = `${this.title} by ${this.author}, ${this.pages}pages, ${readStatus}`;
    console.log(bookInfo);
    return bookInfo;
  };
}

// Contains info related to the input section
// for the library
function inputs() {
  this.inputContainer;
  this.inputForm;
  this.newBtn;
  this.submitBtn;
}

// Initialises the display for the library (headers, title for the table)
// return: The table for the library
function initDisplay() {
  const body = document.querySelector("body");

  const table = document.createElement("table");
  body.appendChild(table);

  const caption = document.createElement("caption");
  caption.textContent = "My library";
  table.appendChild(caption);

  const headerRow = document.createElement("tr");
  table.appendChild(headerRow);

  const title = document.createElement("th");
  title.textContent = "title";
  headerRow.appendChild(title);

  const author = document.createElement("th");
  author.textContent = "author";
  headerRow.appendChild(author);

  const pages = document.createElement("th");
  pages.textContent = "pages";
  headerRow.appendChild(pages);

  const readStatus = document.createElement("th");
  readStatus.textContent = "read status";
  headerRow.appendChild(readStatus);

  return table;
}

// Displays book using html table element
function displayBook(library) {
  for (let i = library.displayed; i < library.bookContent.length; i++) {
    const book = library.bookContent[i];

    console.log(book);
    const row = document.createElement("tr");
    library.table.appendChild(row);

    const title = document.createElement("td");
    title.textContent = book.title;
    row.appendChild(title);

    const author = document.createElement("td");
    author.textContent = book.author;
    row.appendChild(author);

    const pages = document.createElement("td");
    pages.textContent = book.pages.toString();
    row.appendChild(pages);

    const readStatus = document.createElement("td");
    readStatus.textContent = book.readStatus ? "read" : "not read";
    row.appendChild(readStatus);

    library.displayed = library.displayed + 1;
  }
}

const crimeAndPunishment = new Book(
  "Crime and Punishment",
  "F, Dostoyevsky",
  492,
  false
);

const theIdiot = new Book("theIdiot", "F, Dostoyevsky", 718, false);

let myLibrary = new library();
const table = initDisplay();
myLibrary.table = table;

// Can be uncommented to see default behaviour
// myLibrary.bookContent.push(theHobbit);
// myLibrary.bookContent.push(crimeAndPunishment);
// myLibrary.bookContent.push(theIdiot);

displayBook(myLibrary);

let myInputs = new inputs();
const inputContainer = document.querySelector(".input.container");
myInputs.inputContainer = inputContainer;

// Creates an input row with the labels and id given
function createInputRow(labels, placeholder) {
  const row = document.createElement("div");
  const title = document.createElement("label");

  title.setAttribute("for", labels);
  title.textContent = labels.charAt(0).toUpperCase() + labels.slice(1) + ":";
  row.appendChild(title);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", labels);
  input.setAttribute("placeholder", placeholder);
  input.required = true;
  row.appendChild(input);

  return row;
}

// implict function with this as the event.
function addNewBook() {
  if (!myInputs.newBtn.classList.contains("not-active")) {
    return;
  }

  myInputs.newBtn.classList.remove("not-active");
  const form = document.createElement("form");

  form.setAttribute("class", "form");
  form.setAttribute('method', 'post');
  myInputs.inputForm = form;
  myInputs.inputContainer.append(form);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("class", "submit");
  submitBtn.textContent = "submit";
  submitBtn.addEventListener("click", addBook, false);

  // section for title
  const title = createInputRow("title", "Title for book");
  form.appendChild(title);

  // section for author
  const author = createInputRow("author", "Author of book");
  form.appendChild(author);

  // section for pages
  const pages = createInputRow("pages", "Number of pages");
  form.appendChild(pages);

  const readStatus = createInputRow("status", "Read status: yes/no");
  form.appendChild(readStatus);

  form.appendChild(submitBtn);

  myInputs.submitBtn = submitBtn;
}

const newBtn = document.querySelector("button.new");
myInputs.newBtn = newBtn;

// this in a method invocation
newBtn.addEventListener("click", addNewBook, false);

// tries to add a new book to the library
function addBook(event) {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const status = document.querySelector("#status");
  const readStatus = status.value === "yes" ? true : false;
  const newBook = new Book(title.value, author.value, pages.value, readStatus);
  myLibrary.bookContent.push(newBook);

  myInputs.inputContainer.removeChild(myInputs.inputForm);
  displayBook(myLibrary);
  myInputs.newBtn.classList.add('not-active');
  event.preventDefault(); 
}
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
  this.displayed = false;

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
  table.setAttribute("class", "table table-striped");
  body.appendChild(table);

  const caption = document.createElement("caption");

  caption.textContent = "My library";
  table.appendChild(caption);

  const headerTitle = document.createElement("thead");
  headerTitle.setAttribute("class", "thead-light");
  table.append(headerTitle)

  const headerRow = document.createElement("tr");
  headerTitle.appendChild(headerRow);

  const title = document.createElement("th");
  title.setAttribute("scope", "col");
  title.textContent = "Title";
  headerRow.appendChild(title);

  const author = document.createElement("th");
  author.setAttribute("scope", "col");
  author.textContent = "Author";
  headerRow.appendChild(author);

  const pages = document.createElement("th");
  pages.setAttribute("scope", "col");
  pages.textContent = "Pages";
  headerRow.appendChild(pages);

  const readStatus = document.createElement("th");
  readStatus.setAttribute("scope", "col");
  readStatus.textContent = "Read status";
  headerRow.appendChild(readStatus);

  const deleteBook = document.createElement("th");
  deleteBook.setAttribute("scope", "col");
  deleteBook.textContent = "Delete book";
  headerRow.appendChild(deleteBook);

  return table;
}

// Removes the book from the library
function removeBook(deleteBtn, row) {
  // mark the array to be removed.
  const index = +deleteBtn.getAttribute("data");

  // console.log(index);

  myLibrary.bookContent.splice(index, 1);
  myLibrary.displayed = index;

  myLibrary.myTable.removeChild(row);

  // displayBook((myLibrary));
}

// Toggles the status of the reading button
function toggleStatus(statusBtn) {
  if (statusBtn.classList.contains("not-read")) {
    statusBtn.classList.remove("not-read")
    statusBtn.classList.add("read");
    statusBtn.textContent = "read";
  } else {
    statusBtn.classList.remove("read");
    statusBtn.classList.add("not-read");
    statusBtn.textContent = "not read";
  }
}
 
// Displays book using html table element
function displayBook(library) {
  for (let i = library.displayed; i < library.bookContent.length; i++) {
    const book = library.bookContent[i];
    if (book.displayed) {
      library.displayed = library.displayed + 1;
      continue;
    }

    console.log(book);
    const row = document.createElement("tr");
    library.myTable.appendChild(row);

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
    const statusBtn = document.createElement("button");
    const statusTxt = book.read ? "read" : "not-read";
    statusBtn.textContent = book.read ? "read" : "not read";

    statusBtn.classList.add("status", statusTxt);
    readStatus.appendChild(statusBtn);

    statusBtn.addEventListener('click', function() {
      toggleStatus(statusBtn);
    });

    row.appendChild(readStatus);

    const deleteStatus = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.setAttribute("data", ""+i);
    deleteBtn.setAttribute("class", "delete");

    deleteStatus.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function() {
      removeBook(deleteBtn, row);
    });

    row.appendChild(deleteStatus);
    
    library.displayed = library.displayed + 1;
    book.displayed = true;
  }
}

const crimeAndPunishment = new Book(
  "Crime and Punishment",
  "F, Dostoyevsky",
  492,
  false
);

const theIdiot = new Book("theIdiot", "F, Dostoyevsky", 718, true);

let myLibrary = new library();
const table = initDisplay();
myLibrary.myTable = table;

// Can be uncommented to see default behaviour
myLibrary.bookContent.push(crimeAndPunishment);
myLibrary.bookContent.push(theIdiot);

displayBook(myLibrary);

let myInputs = new inputs();
const inputContainer = document.querySelector(".input.container");
myInputs.inputContainer = inputContainer;

// Creates an input row with the labels and id given
function createInputRow(labels, placeholder) {
  const row = document.createElement("div");
  const title = document.createElement("label");

  row.setAttribute("class", "form-group"); // bootstrap class

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
  form.setAttribute("method", "post");
  myInputs.inputForm = form;
  myInputs.inputContainer.append(form);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("class", "btn btn-primary");
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
  myInputs.newBtn.classList.add("not-active");
  event.preventDefault();
}
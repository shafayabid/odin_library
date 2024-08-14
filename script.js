const myLibrary = [];

const container = document.querySelector('.container-cards');
const card = document.querySelector('.card');

const btnAddBook = document.querySelector(".add-book");

const dialog = document.querySelector("dialog");

const bookNameInput = document.querySelector('#book-name');
const authorNameInput = document.querySelector('#author-name');
const pagesInput = document.querySelector('#pages');
const isReadRadio = document.querySelector('#isRead');
const isNotReadRadio = document.querySelector('#isNotRead');

const btnAddBookDialog = document.querySelector('.add-book-dialog');
const btnCancel = document.querySelector('.cancel-dialog');

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Not Read");

btnAddBook.addEventListener("click", () => {
    dialog.showModal();
});

btnAddBookDialog.addEventListener("click", () => {
    if (isReadRadio.checked) {
        addBookToLibrary(bookNameInput.value, authorNameInput.value, pagesInput.value, "Read");
    } else {
        addBookToLibrary(bookNameInput.value, authorNameInput.value, pagesInput.value, "Not Read");
    }
    dialog.close();
});

btnCancel.addEventListener('click', () => {
    dialog.close()
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks()

}

function displayBooks() {
    container.innerHTML = '';
    myLibrary.forEach((book, index) => {
        
        const newCard = card.cloneNode(true);

        newCard.children[0].textContent = book.title;
        newCard.children[1].textContent = book.author;
        newCard.children[2].textContent = book.pages;

        newCard.children[3].textContent = book.read;
        newCard.children[3].addEventListener('click', () => {
            if(myLibrary[index].read === "Read") {
                myLibrary[index].read = "Not Read";
                displayBooks();
            } else {
                myLibrary[index].read = "Read";
                displayBooks();
            }
        });
        
        newCard.children[4].setAttribute('data-index', index);
        newCard.children[4].addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            myLibrary.splice(index, 1);
            displayBooks()
        });

        container.appendChild(newCard);
    });
}
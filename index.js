const express = require("express");

// database
const database = require("./database");

// initialization
const booky = express();

// configuration
booky.use(express.json());

// BOOKS
/*
Route           /
Description     Get all books
Access          PUBLIC 
Parameter       NONE    
Methods         GET
*/
booky.get("/", (req, res) => {
    return res.json({ books: database.books });
});

/*
Route           /ISBN
Description     Get specific books based on ISBN
Access          PUBLIC 
Parameter       isbn    
Methods         GET
*/
booky.get("/ISBN/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);


    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` })
    }

    return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC 
Parameter       category    
Methods         GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category));

    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.category}` })
    }

    return res.json({ book: getSpecificBook });
});

/*
Route           /lang
Description     Get specific books based on language
Access          PUBLIC 
Parameter       language    
Methods         GET
*/
booky.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language);

    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the langauge of ${req.params.language}` });
    }

    return res.json({ book: getSpecificBook });
});



// AUTHOR
/*
Route           /author
Description     Get all authors
Access          PUBLIC 
Parameter       NONE    
Methods         GET
*/
booky.get("/author", (req, res) => {
    return res.json({ authors: database.author });
});

/*
Route           /authors
Description     Get specific authors
Access          PUBLIC 
Parameter       name  
Methods         GET
*/
booky.get("/authors/:name", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.name === req.params.name);

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the name ${req.params.name}` });
    }

    return res.json({ author: getSpecificAuthor });
});

/*
Route           /authors/book
Description     Get all authors based on book
Access          PUBLIC 
Parameter       isbn  
Methods         GET
*/
booky.get("/authors/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}`, })
    }

    return res.json({ author: getSpecificAuthor })
});



// PUBLICATION
/*
Route           /publications
Description     Get all publications 
Access          PUBLIC 
Parameter       none  
Methods         GET
*/
booky.get("/publications", (req, res) => {
    return res.json({ publication: database.publication });
});

/*
Route           /publications
Description     Get specific publications 
Access          PUBLIC 
Parameter       name  
Methods         GET
*/
booky.get("/publications/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.name === req.params.name);

    if (getSpecificPublication.length === 0) {
        return res.json({ error: `No publication found of the name ${req.params.name}` });
    }

    return res.json({ publication: getSpecificPublication });
});

/*
Route           /publications/books
Description     Get list of publications based on book
Access          PUBLIC 
Parameter       isbn
Methods         GET
*/

booky.get("/publications/books/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));

    if (getSpecificPublication.length === 0) {
        return res.json({ error: `No publication found for the book of ${req.params.isbn}` })
    }

    return res.json({ publication: getSpecificPublication })
});

// -----------------------------------------------------------------------------------------------

/*
Route           /book/add
Description     Add new book
Access          PUBLIC 
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books });
});

/*
Route           /author/add
Description     Add new author
Access          PUBLIC 
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req, res) => {
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({ authors: database.author });
});

/*
Route           /publication/add
Description     Add new publication
Access          PUBLIC 
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add", (req, res) => {
    const { newPublication } = req.body;
    database.publication.push(newPublication);
    return res.json({ publications: database.publication });
});

// -----------------------------------------------------------------------------------------------

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC 
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({ books: database.books });
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          PUBLIC 
Parameter       isbn, authorId
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    //Update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    //Update author database
    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId))
            return author.books.push(req.params.isbn);

    });

    return res.json({ books: database.books, author: database.author });
});

/*
Route           author/update/name
Description     Update author name
Access          PUBLIC 
Parameter       id
Methods         PUT
*/

// booky.put("/author/update/name/:id", (req, res) => {
//     database.author.forEach((author) => {
//         if (author.id === parseInt(req.params.id)) {
//             author.name = req.body.newAuthorName;
//             return;
//         }
//     });
//     return res.json({ author: database.author });
// });

booky.put("/author/update/name/:books", (req, res) => {
    database.author.forEach((author) => {
        if (author.books.includes(req.params.books)) {
            author.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({ author: database.author });
});

/*
Route           publication/update/name
Description     Update the publication name using books
Access          PUBLIC 
Parameter       books
Methods         PUT
*/
booky.put("/publication/update/name/:books", (req, res) => {
    database.publication.forEach((publication) => {
        if (publication.books.includes(req.params.books)) {
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return res.json({ publication: database.publication });
});

/*
Route           /book/update/publication/
Description     Update/add books to publications
Access          PUBLIC 
Parameter       isbn, publicationId
Methods         PUT
*/
booky.put("/book/update/publication/:isbn/:publicationId", (req, res) => {
    //Update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.publications.push(parseInt(req.params.publicationId));
        }
    });

    //Update publication database
    database.publication.forEach((publication) => {
        if (publication.id === parseInt(req.params.publicationId))
            return publication.books.push(req.params.isbn);
    });

    return res.json({ books: database.books, publication: database.publication });
});

// -----------------------------------------------------------------------------------------------

/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC 
Parameter       isbn
Methods         DELETE
*/

booky.delete("/book/delete/:isbn", (req, res) => {

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn);

    database.books = updatedBookDatabase;
    return res.json({ message: "book was deleted !!! 😪", books: database.books });
});

/*
Route           /book/delete/author
Description     Delete an author from a book
Access          PUBLIC 
Parameter       isbn, authorId
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {

    //Update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (author) => author !== parseInt(req.params.authorId));

            book.author = newAuthorList;
            return;
        }
    });

    //Update the author database
    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            const newBookList = author.books.filter(
                (book) => book !== req.params.isbn);

            author.books = newBookList;
            return;
        }
    });
    return res.json({ message: "author was deleted !!! 😪", books: database.books, author: database.author });
});

/*
Route           /author/delete
Description     Delete an author
Access          PUBLIC 
Parameter       name
Methods         DELETE
*/
booky.delete("/author/delete/:name", (req, res) => {
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.name !== req.params.name);

    database.author = updatedAuthorDatabase;
    return res.json({ message: "author was deleted !!! 😪", author: database.author });
});

/*
Route           /publication/delete/book
Description     Delete a book form publication
Access          PUBLIC 
Parameter       isbn, publicationId
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:publicationId", (req, res) => {
    //Update publication database
    database.publication.forEach((publication) => {
        if (publication.id === parseInt(req.params.publicationId)) {
            const newBookList = publication.books.filter(
                (book) => book !== req.params.isbn);

            publication.books = newBookList;
            return;
        }
    })

    //Update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publications = 0;   //no publication available
            return;
        }
    });

    return res.json({ books: database.books, publication: database.publication });
});


/*
Route           /publication/delete
Description     Delete publication
Access          PUBLIC 
Parameter       name
Methods         DELETE
*/
booky.delete("/publication/delete/:name", (req, res) => {

    const updatedPublicationDatabase = database.publication.filter(
        (publication) => publication.name !== req.params.name);

    database.publication = updatedPublicationDatabase;
    return res.json({ message: "author was deleted !!! 😪", publication: database.publication });
});

// -----------------------------------------------------------------------------------------------
booky.listen(99, () => console.log("YO ! The server is running"));

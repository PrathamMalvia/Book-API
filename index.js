const express = require("express");

// database
const database = require("./database");

// initialization
const booky = express();

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
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}`, })
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
        return res.json({ error: `No book found for the category of ${req.params.category}`, })
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
Parameter         
Methods         GET
*/

booky.get("/publications/books/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));

    if (getSpecificPublication.length === 0) {
        return res.json({ error: `No publication found for the book of ${req.params.isbn}`, })
    }

    return res.json({ publication: getSpecificPublication })
});


booky.listen(99, () => console.log("The server is running"));

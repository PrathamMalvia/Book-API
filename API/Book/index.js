// Prefix : /book

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/book");

/*
Route           /
Description     Get all books
Access          PUBLIC 
Parameter       NONE    
Methods         GET
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ books: getAllBooks });
});

/*
Route           /ISBN
Description     Get specific books based on ISBN
Access          PUBLIC 
Parameter       isbn    
Methods         GET
*/
Router.get("/ISBN/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn })
    // const getSpecificBook = database.books.filter(
    //     (book) => book.ISBN === req.params.isbn);

    if (!getSpecificBook) {
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
Router.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ category: req.params.category })
    // const getSpecificBook = database.books.filter(
    //     (book) => book.category.includes(req.params.category));

    if (!getSpecificBook) {
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
Router.get("/lang/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ language: req.params.language });
    // const getSpecificBook = database.books.filter(
    //     (book) => book.language === req.params.language);

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the langauge of ${req.params.language}` });
    }

    return res.json({ book: getSpecificBook });
});

/*
Route           /book/add
Description     Add new book
Access          PUBLIC 
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
    try {
        const { newBook } = req.body;

        await BookModel.create(newBook);
        return res.json({ message: "book was added !!!" });
    } catch (error) {
        res.json({ error: error.message })
    }

});

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC 
Parameter       isbn
Methods         PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.newBookTitle
        },
        {
            new: true
        })

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.title = req.body.newBookTitle;
    //         return;
    //     }
    // });
    return res.json({ books: updatedBook });
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          PUBLIC 
Parameter       isbn, authorId
Methods         PUT
*/
Router.put("/update/author/:isbn", async (req, res) => {
    //Update book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                author: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return book.author.push(parseInt(req.params.authorId));
    //     }
    // });

    //Update author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    // database.author.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId))
    //         return author.books.push(req.params.isbn);

    // });

    return res.json({ books: updatedBook, author: updatedAuthor });
});

/*
Route           /book/update/publication/
Description     Update/add books to publications
Access          PUBLIC 
Parameter       isbn, publicationId
Methods         PUT
*/
Router.put("/update/publication/:isbn", async (req, res) => {
    //Update book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                publications: req.params.newPublication
            }
        },
        {
            new: true
        }
    )

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return book.publications.push(parseInt(req.params.publicationId));
    //     }
    // });

    //Update publication database

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: req.body.newPublication
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    )

    // database.publication.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.publicationId))
    //         return publication.books.push(req.params.isbn);
    // });

    return res.json({ books: updatedBook, publication: updatedPublication });
});

// -----------------------------------------------------------------------------------------------

/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC 
Parameter       isbn
Methods         DELETE
*/

Router.delete("/delete/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        },
    )

    // const updatedBookDatabase = database.books.filter(
    //     (book) => book.ISBN !== req.params.isbn);

    // database.books = updatedBookDatabase;
    return res.json({ message: "book was deleted !!! 😪", books: updatedBook });
});

/*
Route           /book/delete/author
Description     Delete an author from a book
Access          PUBLIC 
Parameter       isbn, authorId
Methods         DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {

    //Update the book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $pull: {
                author: parseInt(req.params.authorId)
            }
        },
        {
            new: true
        }
    )

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newAuthorList = book.author.filter(
    //             (author) => author !== parseInt(req.params.authorId));

    //         book.author = newAuthorList;
    //         return;
    //     }
    // });

    //Update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.authorId)
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    )

    // database.author.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId)) {
    //         const newBookList = author.books.filter(
    //             (book) => book !== req.params.isbn);

    //         author.books = newBookList;
    //         return;
    //     }
    // });
    return res.json({ message: "author was deleted !!! 😪", books: updatedBook, author: updatedAuthor });
});


module.exports = Router;
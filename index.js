require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// database
const database = require("./database/database").default;

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// initialization
const booky = express();

// configuration
booky.use(express.json());

// Establish Database Connection
mongoose.connect(process.env.MONGO_URL
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    //     useCreateIndex: true,
    // }
).then(() => console.log("Connection Established !!!!!"));

// BOOKS
/*
Route           /
Description     Get all books
Access          PUBLIC 
Parameter       NONE    
Methods         GET
*/
booky.get("/", async (req, res) => {
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
booky.get("/ISBN/:isbn", async (req, res) => {
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
booky.get("/c/:category", async (req, res) => {
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
booky.get("/lang/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ language: req.params.language });
    // const getSpecificBook = database.books.filter(
    //     (book) => book.language === req.params.language);

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the langauge of ${req.params.language}` });
    }

    return res.json({ book: getSpecificBook });
});



// AUTHOR
/*
Route           /authors
Description     Get all authors
Access          PUBLIC 
Parameter       NONE    
Methods         GET
*/
booky.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

/*
Route           /authors
Description     Get specific author
Access          PUBLIC 
Parameter       name  
Methods         GET
*/
booky.get("/authors/:name", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ name: req.params.name });
    // const getSpecificAuthor = database.author.filter(
    //     (author) => author.name === req.params.name);

    if (!getSpecificAuthor) {
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
booky.get("/authors/book/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ books: req.params.isbn });
    // const getSpecificAuthor = database.author.filter(
    //     (author) => author.books.includes(req.params.isbn));

    if (!getSpecificAuthor) {
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
booky.get("/publications", async (req, res) => {

    const getAllPublications = await PublicationModel.find();
    return res.json({ publication: getAllPublications });
});

/*
Route           /publications
Description     Get specific publications 
Access          PUBLIC 
Parameter       name  
Methods         GET
*/
booky.get("/publications/:name", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ name: req.params.name });
    // const getSpecificPublication = database.publication.filter(
    //     (publication) => publication.name === req.params.name);

    if (!getSpecificPublication) {
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

booky.get("/publications/books/:isbn", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ books: req.params.isbn });
    // const getSpecificPublication = database.publication.filter(
    //     (publication) => publication.books.includes(req.params.isbn));

    if (!getSpecificPublication) {
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
booky.post("/book/add", async (req, res) => {
    const { newBook } = req.body;

    BookModel.create(newBook);
    return res.json({ message: "book was added !!!" });
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

    AuthorModel.create(newAuthor);
    return res.json({ message: "author was added !!!" });
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

    PublicationModel.create(newPublication);
    return res.json({ message: "publication was added !!!" });
});

// -----------------------------------------------------------------------------------------------

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC 
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn", async (req, res) => {
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
booky.put("/book/update/author/:isbn", async (req, res) => {
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
Route           author/update/name
Description     Update author name
Access          PUBLIC 
Parameter       id
Methods         PUT
*/

booky.put("/author/update/name/:id", async (req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.params.id
        },
        {
            name: req.body.newAuthorName
        },
        {
            new: true
        }
    )

    //     database.author.forEach((author) => {
    //         if (author.id === parseInt(req.params.id)) {
    //             author.name = req.body.newAuthorName;
    //             return;
    //         }
    //     });
    //     return res.json({ author: database.author });
    // });

    /* booky.put("/author/update/name/:books", async (req, res) => {
        database.author.forEach((author) => {
            if (author.books.includes(req.params.books)) {
                author.name = req.body.newAuthorName;
                return;
            }
        }); */

    return res.json({ author: updatedAuthor });
});

/*
Route           publication/update/name
Description     Update the publication name using books
Access          PUBLIC 
Parameter       books
Methods         PUT
*/
booky.put("/publication/update/name/:books", async (req, res) => {

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            books: req.params.books
        },
        {
            name: req.body.newPublicationName
        },
        {
            new: true
        }
    )

    // database.publication.forEach((publication) => {
    //     if (publication.books.includes(req.params.books)) {
    //         publication.name = req.body.newPublicationName;
    //         return;
    //     }
    // });
    return res.json({ publication: updatedPublication });
});

/*
Route           /book/update/publication/
Description     Update/add books to publications
Access          PUBLIC 
Parameter       isbn, publicationId
Methods         PUT
*/
booky.put("/book/update/publication/:isbn", async (req, res) => {
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

booky.delete("/book/delete/:isbn", async (req, res) => {

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
booky.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {

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

/*
Route           /author/delete
Description     Delete an author
Access          PUBLIC 
Parameter       name
Methods         DELETE
*/
booky.delete("/author/delete/:name", async (req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndDelete(
        {
            name: req.params.name
        }
    )

    // const updatedAuthorDatabase = database.author.filter(
    //     (author) => author.name !== req.params.name);

    // database.author = updatedAuthorDatabase;

    return res.json({ message: "author was deleted !!! 😪", author: updatedAuthor });
});

/*
Route           /publication/delete/book
Description     Delete a book from publication
Access          PUBLIC 
Parameter       isbn, publicationId
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:publicationId", async (req, res) => {
    //Update book database

    const updatedBook = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        },
    )

    // database.publication.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.publicationId)) {
    //         const newBookList = publication.books.filter(
    //             (book) => book !== req.params.isbn);

    //         publication.books = newBookList;
    //         return;
    //     }
    // })

    //Update publication database

    const updatedPublication = await PublicationModel.findOneAndDelete(
        {
            id: req.params.publicationId
        }
    )

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publications = 0;   //no publication available
    //         return;
    //     }
    // });

    return res.json({ books: updatedBook, publication: updatedPublication });
});


/*
Route           /publication/delete
Description     Delete publication
Access          PUBLIC 
Parameter       name
Methods         DELETE
*/
booky.delete("/publication/delete/:name", async (req, res) => {

    const updatedPublication = await PublicationModel.findOneAndDelete(
        {
            name: req.params.name
        }
    )

    // const updatedPublicationDatabase = database.publication.filter(
    //     (publication) => publication.name !== req.params.name);

    // database.publication = updatedPublicationDatabase;

    return res.json({ message: "author was deleted !!! 😪", publication: updatedPublication });
});

// -----------------------------------------------------------------------------------------------
booky.listen(99, () => console.log("YO ! The server is running"));

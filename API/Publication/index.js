const Router = require("express").Router();

const PublicationModel = require("../../database/publication");


/*
Route           /publication
Description     Get all publications 
Access          PUBLIC 
Parameter       none  
Methods         GET
*/
Router.get("/", async (req, res) => {

    const getAllPublications = await PublicationModel.find();
    return res.json({ publication: getAllPublications });
});

/*
Route           /publication
Description     Get specific publications 
Access          PUBLIC 
Parameter       name  
Methods         GET
*/
Router.get("/:name", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ name: req.params.name });
    // const getSpecificPublication = database.publication.filter(
    //     (publication) => publication.name === req.params.name);

    if (!getSpecificPublication) {
        return res.json({ error: `No publication found of the name ${req.params.name}` });
    }

    return res.json({ publication: getSpecificPublication });
});

/*
Route           /publication/books
Description     Get list of publications based on book
Access          PUBLIC 
Parameter       isbn
Methods         GET
*/

Router.get("/books/:isbn", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ books: req.params.isbn });
    // const getSpecificPublication = database.publication.filter(
    //     (publication) => publication.books.includes(req.params.isbn));

    if (!getSpecificPublication) {
        return res.json({ error: `No publication found for the book of ${req.params.isbn}` })
    }

    return res.json({ publication: getSpecificPublication })
});

/*
Route           /publication/add
Description     Add new publication
Access          PUBLIC 
Parameter       NONE
Methods         POST
*/
Router.post("/add", (req, res) => {
    const { newPublication } = req.body;

    PublicationModel.create(newPublication);
    return res.json({ message: "publication was added !!!" });
});

/*
Route           publication/update/name
Description     Update the publication name using books
Access          PUBLIC 
Parameter       books
Methods         PUT
*/
Router.put("/update/name/:books", async (req, res) => {

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
Route           /publication/delete/book
Description     Delete a book from publication
Access          PUBLIC 
Parameter       isbn, publicationId
Methods         DELETE
*/
Router.delete("/delete/book/:isbn/:publicationId", async (req, res) => {
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
Router.delete("/delete/:name", async (req, res) => {

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

module.exports = Router;
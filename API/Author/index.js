const Router = require("express").Router();

const AuthorModel = require("../../database/author")


/*
Route           /author
Description     Get all authors
Access          PUBLIC 
Parameter       NONE    
Methods         GET
*/
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

/*
Route           /author
Description     Get specific author
Access          PUBLIC 
Parameter       name  
Methods         GET
*/
Router.get("/:name", async (req, res) => {
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
Router.get("/book/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ books: req.params.isbn });
    // const getSpecificAuthor = database.author.filter(
    //     (author) => author.books.includes(req.params.isbn));

    if (!getSpecificAuthor) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}`, })
    }

    return res.json({ author: getSpecificAuthor })
});

/*
Route           /authors/add
Description     Add new author
Access          PUBLIC 
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
    try {
        const { newAuthor } = req.body;

        await AuthorModel.create(newAuthor);
        return res.json({ message: "author was added !!!" });
    } catch (error) {
        res.json({ error: error.message })
    }
});

/*
Route           author/update/name
Description     Update author name
Access          PUBLIC 
Parameter       id
Methods         PUT
*/

Router.put("/update/name/:id", async (req, res) => {

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

    /* Router.put("/author/update/name/:books", async (req, res) => {
        database.author.forEach((author) => {
            if (author.books.includes(req.params.books)) {
                author.name = req.body.newAuthorName;
                return;
            }
        }); */

    return res.json({ author: updatedAuthor });
});

/*
Route           /author/delete
Description     Delete an author
Access          PUBLIC 
Parameter       name
Methods         DELETE
*/
Router.delete("/delete/:name", async (req, res) => {

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

module.exports = Router;
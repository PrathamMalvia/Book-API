const mongoose = require("mongoose");

// Creating a book Schema
const BookSchema = mongoose.Schema({

    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    }, //required
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    pubDate: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    },
    language: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 3
    },
    numPage: {
        type: Number,
        required: true,
    },
    author: {
        type: [Number],
        required: true,
    },
    publications: {
        type: Number,
        required: true
    },
    category: {
        type: [String],
        required: true,
    },

});

// Creating a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
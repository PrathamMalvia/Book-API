const mongoose = require("mongoose");

// Creating a book Schema
const BookSchema = mongoose.Schema({
    
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publications: Number,
    category: [String],

});

// Creating a book model
const BookModel =mongoose.model(BookSchema);

module.exports =BookModel;
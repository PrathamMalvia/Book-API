const mongoose = require("mongoose");

// Author Schema
const AuthorSchema = mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        maxLength: 50,
        required: true

    },
    books: {
        type: [String],
        required: true
    }
});

// Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;
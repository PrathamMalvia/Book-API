require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");


// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");


// initializing express
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


// Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);


booky.listen(99, () => console.log("YO ! The server is running"));

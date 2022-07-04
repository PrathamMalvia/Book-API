const books = [
    {
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate: "2022-07-07",
        language: "en",
        numPage: "250",
        author: [1, 2],
        publications: [1],
        category: ["tech", "programming", "education", "thriller"]
    },
];

const author = [
    {
        id: 1,
        name: "Pratham Malvia",
        books: ["123Book", "789Secret"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["456Space"],
    },
    {
        id: 1,
        name: "Jeff Bezos",
        books: ["123Book", "789Secret"],
    },
];

const publication = [
    {
        id: 1,
        name: "readx",
        books: ["123Book", "456Space"],
    },
    {
        id: 2,
        name: "writex",
        books: ["789Hello", "123World"],
    },
    {
        id: 3,
        name: "spacex",
        books: ["99Secret"],
    }
];

module.exports = { books, author, publication };
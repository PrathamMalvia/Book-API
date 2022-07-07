const books = [
    {
        ISBN: "12345ONE",
        title: "Getting started with MERN",
        pubDate: "2022-07-07",
        language: "en",
        numPage: 250,
        author: [1, 2, 3],
        publications: 1,
        category: ["tech", "programming", "education", "thriller"]
    },
    {
        ISBN: "12345TWO",
        title: "Getting started with Python",
        pubDate: "2022-07-07",
        language: "en",
        numPage: 200,
        author: [1, 2, 3],
        publications: 1,
        category: ["tech", "programming", "education"]
    },
];

const author = [
    {
        id: 1,
        name: "Pratham Malvia",
        books: ["12345ONE", "12345TWO"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345ONE"],
    },
    {
        id: 3,
        name: "Jeff Bezos",
        books: ["12345ONE", "12345TWO"],
    },
];

const publication = [
    {
        id: 1,
        name: "Jaico",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "Westland",
        books: ["12345TWO"],
    },
    {
        id: 3,
        name: "Roli",
        books: [],
    }
];

module.exports = { books, author, publication };
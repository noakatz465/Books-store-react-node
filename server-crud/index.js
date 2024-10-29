const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
app.get('/', (req, res)=>{
    res.send('Hello!')
})
app.use(cors());
app.use(express.json());
app.listen(3001, ()=>{
    console.log('App is listening!');   
})

const readBooks = () =>{
    const data = fs.readFileSync('./data/db.json');
    return JSON.parse(data).books;
};
const writeBooks = (books) => {
    const data = JSON.stringify({ books }, null, 2);
    fs.writeFileSync('./data/db.json', data);
};

app.get('/books', (req, res) => {
    const books = readBooks();
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not exist!');
    }
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    const books = readBooks();
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const books = readBooks();
    const index = books.findIndex(b => b.id === bookId);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        writeBooks(books);
        res.json(books[index]);
    } else {
        res.status(404).send('Book not exist!');
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const books = readBooks();
    const index = books.findIndex(b => b.id === bookId);

    if (index !== -1) {
        const deletedBook = books.splice(index, 1); 
        writeBooks(books);
        res.json(deletedBook[0]);
    } else {
        res.status(404).send('Book not exist!');
    }
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const books = readBooks();
    const index = books.findIndex(b => b.id === bookId);
    
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        writeBooks(books);
        res.json(books[index]);
    } else {
        res.status(404).send('Book does not exist!');
    }
});
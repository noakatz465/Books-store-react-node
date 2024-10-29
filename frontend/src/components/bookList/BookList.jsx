import React, { useEffect, useState } from 'react';
import Book from '../book/Book';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ id: '', title: '', price: '', image: '' });
    const [editBook, setEditBook] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleEditBook = (book) => {
        setEditBook(book);

    }

    const handleDeleteBook = (id) => {
        fetch(`http://localhost:3001/books/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete book');
                }
                console.log('Book deleted:', id);
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
            })
            .catch(error => console.error('Error deleting book:', error));
    }


    const handleAddBook = () => {
        if (newBook.title && newBook.price && newBook.image && newBook.id) {
            fetch('http://localhost:3001/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add book');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Book added:', data);
                    setBooks(prevBooks => [...prevBooks, data]);
                    setNewBook({ id: '', title: '', price: '', image: '' });
                })
                .catch(error => console.error('Error adding book:', error));
        } else {
            alert('אנא מלא את כל השדות!');
        }
    }

    const handleUpdateBook = () => {
        fetch(`http://localhost:3001/books/${editBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editBook),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update book');
                }
                return response.json();
            })
            .then(data => {
                console.log('Book updated:', data);
                setBooks(prevBooks => prevBooks.map(book => (book.id === data.id ? data : book))); 
                setEditBook(null);
            })
            .catch(error => console.error('Error updating book:', error));
    }

    return (
        <div className='BookList'>
            <h1>ספרים:</h1>
            <div className="book-list">
                {books.map(book => (
                    <div className='book' key={book.id}>
                        <div className='book' key={book.id}>
                            <Book book={book} />
                            <div className="button-container">
                                <button className="edit" onClick={() => handleEditBook(book)}>ערוך</button>
                                <button className="delete" onClick={() => handleDeleteBook(book.id)}>מחק</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2>הוסף ספר חדש:</h2>
            <input type="text" placeholder="id" value={newBook.id}
                onChange={(e) => setNewBook({ ...newBook, id: e.target.value })} />
            <input type="text" placeholder="כותרת" value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
            <input type="text" placeholder="מחיר" value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} />
            <input type="text" placeholder="URL תמונה" value={newBook.image}
                onChange={(e) => setNewBook({ ...newBook, image: e.target.value })} />
            <button onClick={handleAddBook}>הוסף ספר</button>

            {editBook && (
                <div>
                    <h2>ערוך ספר:</h2>
                    <input type="text" value={editBook.title}
                        onChange={(e) => setEditBook({ ...editBook, title: e.target.value })} />
                    <input type="text" value={editBook.price}
                        onChange={(e) => setEditBook({ ...editBook, price: e.target.value })} />
                    <input type="text" value={editBook.image}
                        onChange={(e) => setEditBook({ ...editBook, image: e.target.value })} />
                    <button onClick={handleUpdateBook}>עדכן ספר</button>
                </div>
            )}
        </div>
    )
}

export default BookList;
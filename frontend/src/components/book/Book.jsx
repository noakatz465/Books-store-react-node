import React from 'react';
import './Book.css';


const Book = ({book}) =>{

    return(
        <div className='Book'>
            <h2>{book.title}</h2>
            <p>מחיר: {book.price}</p>
            <img src={book.image} alt={book.title}></img>
        </div>
    )
}

export default Book;
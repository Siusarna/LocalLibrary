import React from 'react';
import Book from './book.jsx';

const BookList = (props) => {
  const { books } = props;
  const rows = [];
  for (let i = 0; i < books.length; i += 5) {
    rows.push(books.slice(i, Math.min(i + 5, books.length)));
  }

  return (
    <div className='BookList'>
      {rows.map((row, i) => <div className='bookRow' key={i}>
        {row.map((book, j) => (
          <Book key={j} book={book}/>
        ))}
      </div>)}
    </div>
  );
};

export default BookList;

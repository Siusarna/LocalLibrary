import React from 'react';
import Book from './book';

const BookList = (props) => {
  const { books } = props;
  const rows = [];
  for (let i = 0; i < books.length; i += 5) {
    rows.push(books.slice(i, Math.min(i + 5, books.length)));
  }

  return (
    <div className='BookList'>
      {rows.map((row, index) => <div className='bookRow' key={index}>
        {row.map(bookID => (
          <Book key={bookID} id={bookID}/>
        ))}
      </div>)}
    </div>
  )
};

export default BookList;

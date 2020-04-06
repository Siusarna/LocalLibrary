import React from 'react';
import Book from './book';
import SectionTitle from './sectionTitle';
import BookList from './bookList';

// Fake data
// Must be replaced by request on server
const books = ['1', '2', '3', '4', '5']; //recommended books IDs

const Recommendations = () => {
  return (
    <>
      <SectionTitle text='Recommendations' to='/recommendations'/>
      <BookList books={books.slice(0, 5)}/>
    </>
  )
};

export default Recommendations;
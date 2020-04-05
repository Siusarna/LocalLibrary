import React from 'react';
import Book from './book';
import SectionTitle from './sectionTitle';

// Fake data
// Must be replaced by request on server
const books = ['1', '2', '3', '4', '5']; //recommended books IDs

const Recommendations = () => {
  return (
    <>
      <SectionTitle text='Recommendations' to='/recommendations'/>
      <div className='Recommendations'>
        {books.map(id => <Book key={id} id={id} />)}
      </div>
    </>
  )
};

export default Recommendations;
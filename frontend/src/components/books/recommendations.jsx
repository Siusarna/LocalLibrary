import React from 'react';
import SectionTitle from '../layout/sectionTitle';
import BookList from './bookList';
import useFetch from '../../hooks/useFetch';

const Recommendations = () => {
  const { isLoaded, data: books } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/books');
  if (!isLoaded) return true;
  return (
    <>
      <SectionTitle text='Recommendations' to='/recommendations'/>
      <BookList books={books.slice(0, 5)}/>
    </>
  )
};

export default Recommendations;
import React from 'react';
import SectionTitle from '../layout/sectionTitle.jsx';
import BookList from './bookList.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';


const Recommendations = () => {
  const { isLoaded, data: books } = useFetch(api.books());
  if (!isLoaded) return true;
  return (
    <>
      <SectionTitle text='Popular' />
      <BookList books={books
        .sort((book1, book2) => book1.rating < book2.rating)
        .slice(0, 5)} />
    </>
  );
};

export default Recommendations;

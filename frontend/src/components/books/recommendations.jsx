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
      <SectionTitle text='Recommendations' to='/recommendations'/>
      <BookList books={books.slice(0, 5)}/>
    </>
  );
};

export default Recommendations;

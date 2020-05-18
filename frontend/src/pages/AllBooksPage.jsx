import React from 'react';
import useFetch from '../hooks/useFetch.jsx';
import BookList from '../components/books/bookList.jsx';

const AllBooksPage = () => {
  const { isLoaded, data: books } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/books');
  if (!isLoaded) return true;
  return (
    <BookList books={books}/>
  );
};

export default AllBooksPage;

import React from 'react';
import useFetch from '../hooks/useFetch'
import BookList from '../components/books/bookList';

const AllBooksPage = () => {
  const { isLoaded, data: books } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/books');
  if (!isLoaded) return true;
  return (
    <BookList books={books}/>
  )
}

export default AllBooksPage;
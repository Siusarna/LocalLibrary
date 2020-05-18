import React from 'react';
import useFetch from '../hooks/useFetch'
import AuthorList from '../components/authors/authorList';

const AllAuthorsPage = () => {
  const { isLoaded, data: authors } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/authors');
  if (!isLoaded) return true;
  return (
    <AuthorList authors={authors}/>
  )
}

export default AllAuthorsPage;
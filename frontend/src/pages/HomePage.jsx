import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import BookSearch from '../components/bookSearch';
import Recommendations from '../components/recommendations';
import NewsList from '../components/newsList';
import SectionTitle from '../components/sectionTitle';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import SearchForm from '../components/forms/searchForm';
import { useState } from 'react';
import BookList from '../components/bookList';

const HomePage = () => {
  const { role } = useContext(AuthContext);
  const [books, setBooks] = useState(null);
  return (
    <>
      <SearchForm onResult={(books) => { setBooks(books) }} />
      {!books ?
        <>
          <Recommendations />
          <NewsList />
          <SectionTitle text='All Books' to='/books/all' />
          <SectionTitle text='All Authors' to='/authors/all' />
          {role === 'librarian' && <SectionTitle text='Add Book' to='/books/add' />}
          {role === 'librarian' && <SectionTitle text='Add Authors' to='/authors/add' />}
        </> :
        <>
          <SectionTitle text={books.length > 0 ? 'Results' : 'No Results'} />
          <BookList books={books} />
        </>}
    </>
  )
}

export default HomePage;
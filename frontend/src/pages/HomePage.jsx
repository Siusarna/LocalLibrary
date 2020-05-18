import React from 'react';
import Recommendations from '../components/books/recommendations';
import NewsList from '../components/news/newsList';
import SectionTitle from '../components/layout/sectionTitle';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import SearchForm from '../components/forms/searchForm';
import { useState } from 'react';
import BookList from '../components/books/bookList';

const HomePage = () => {
  const { role } = useContext(AuthContext);
  const [books, setBooks] = useState(null);
  return (
    <>
      <SearchForm onResult={(books) => { setBooks(books) }} />
      {!books ?
        <>
          {role === 'librarian' && <SectionTitle text='Work Page' to='/work'/>}
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
import React, { useContext, useState } from 'react';
import Recommendations from '../components/books/recommendations.jsx';
import NewsList from '../components/news/newsList.jsx';
import SectionTitle from '../components/layout/sectionTitle.jsx';

import AuthContext from '../context/authContext.jsx';
import SearchForm from '../components/forms/searchForm.jsx';

import BookList from '../components/books/bookList.jsx';

const HomePage = () => {
  const { role } = useContext(AuthContext);
  const [books, setBooks] = useState(null);
  return (
    <>
      <SearchForm onResult={(searchResult) => { setBooks(searchResult); }} />
      {!books
        ? <>
          {role === 'librarian' && <SectionTitle text='Work Page' to='/work'/>}
          <Recommendations />
          <NewsList />
          <SectionTitle text='All Books' to='/books/all' />
          <SectionTitle text='All Authors' to='/authors/all' />
          {role === 'librarian' && <SectionTitle text='Add Book' to='/books/add' />}
          {role === 'librarian' && <SectionTitle text='Add Authors' to='/authors/add' />}
        </>
        : <>
          <SectionTitle text={books.length > 0 ? 'Results' : 'No Results'} />
          <BookList books={books} />
        </>}
    </>
  );
};

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import BookSearch from '../components/bookSearch';
import Recommendations from '../components/recommendations';
import NewsList from '../components/newsList';
import SectionTitle from '../components/sectionTitle';
import { useContext } from 'react';
import AuthContext from '../context/authContext';

const HomePage = () => {
  const { role } = useContext(AuthContext);
  return (
    <>
      <BookSearch />
      <Recommendations />
      <NewsList />
      <SectionTitle text='All Books' to='/books/all' />
      <SectionTitle text='All Authors' to='/authors/all' />
      {role === 'librarian' && <SectionTitle text='Add Book'      to='/books/add' />}
      {role === 'librarian' && <SectionTitle text='Add Authors'   to='/authors/add' />}
    </>
  )
}

export default HomePage;
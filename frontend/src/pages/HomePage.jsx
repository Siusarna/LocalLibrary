import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import BookSearch from '../components/bookSearch';
import Recommendations from '../components/recommendations';
import NewsList from '../components/newsList';

const HomePage = () => (
  <>
    <Header/>
    <BookSearch />
    <Recommendations/>
    <NewsList/>
  </>
)

export default HomePage;
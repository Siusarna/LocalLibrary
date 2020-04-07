import React from 'react';
import { Link } from 'react-router-dom';
import BookSearch from '../components/bookSearch';
import Recommendations from '../components/recommendations';
import NewsList from '../components/newsList';

const HomePage = () => (
  <>
    <BookSearch />
    <Recommendations/>
    <NewsList/>
  </>
)

export default HomePage;
import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import BookSearch from '../components/bookSearch';
import Recommendations from '../components/recommendations';
import NewsList from '../components/newsList';

const HomePage = () => (
  <>
    <Header>
      <Link to='/register'>
        <div className='linkBox'>Sign Up</div>
      </Link>
      <Link to='/sign-in'>
        <div className='linkBox'>Sign In</div>
      </Link>
    </Header>
    <BookSearch />
    <Recommendations/>
    <NewsList/>
  </>
)

export default HomePage;
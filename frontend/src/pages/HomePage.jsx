import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import BookSearch from '../components/bookSearch';
import Recommendations from '../components/recommendations';

const HomePage = () => (
  <>
    <Header>
      <Link to='/register'>
        <div className='linkBox'>Sign Up</div>
      </Link>
      <Link to='/login'>
        <div className='linkBox'>Sign In</div>
      </Link>
    </Header>
    <BookSearch />
    <Recommendations/>
  </>
)

export default HomePage;
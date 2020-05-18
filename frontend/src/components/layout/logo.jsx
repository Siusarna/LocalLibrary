import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Logo = () => {
  const { pathname } = useLocation();
  return <div className='Logo'>
    <Link to={pathname === '/' ? '/empty' : '/'}>Local Library</Link>
  </div>;
};

export default Logo;

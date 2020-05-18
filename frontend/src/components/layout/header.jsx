import React, { useContext } from 'react';
import Logo from './logo';
import AuthContext from '../../context/authContext';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { role } = useContext(AuthContext)
  return (
    <div className='Header'>
      <Logo />
      {role === 'unauthorized' ? (
        <>
          <Link to='/register'>
            <div className='linkBox'>Sign Up</div>
          </Link>
          <Link to='/sign-in'>
            <div className='linkBox'>Sign In</div>
          </Link>
        </>
      ) : (
        <>
          <Link to='/profile'>
            <div className='linkBox'>Profile</div>
          </Link>
        </>
      )}
    </div>
  )
};

export default Header;

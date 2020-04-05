import React from 'react';
import Logo from './logo';

const Header = (props) => (
  <div className='Header'>
    <Logo/>
    {props.children}
  </div>
);

export default Header;

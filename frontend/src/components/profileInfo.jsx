import React, { useContext } from 'react';
import ImageTextContainer from './imageTextContainer';
import useFetch from '../hooks/useFetch';
import AuthContext from '../context/authContext';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';



const ProfileInfo = () => {
  const { isLoaded, data: user } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/profile');
  const { updateAuth } = useContext(AuthContext);
  const [ redirect, setRedirect ] = useState(false);
  const logOut = () => {
    fetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/logout',{
      credentials: 'include'
    }).then(() => { updateAuth(); setRedirect(true); })
  }
  if (redirect) return <Redirect to='/'/>
  if (!isLoaded) return true;
  return (
    <div className='ProfileInfo'>
      <ImageTextContainer src={user.photo}>
        <div className='title'>
          {user.firstName + ' ' + user.lastName}
        </div>
        <p>{'City: ' + user.city}</p>
        <p>{'Address: ' + user.address}</p>
        <p>{'Age: ' + user.age}</p>
        <p>{'Phone number: ' + user.phone}</p>
      </ImageTextContainer>       
      <button className='dark' onClick={logOut}>
        Log Out
      </button>
    </div>
  )
}

export default ProfileInfo;
import React from 'react';
import { useState } from 'react';

const follow = (book, setSuccess) => () => {
  setSuccess(true);
}

const FollowBookButton = (props) => {
  const [success, setSuccess] = useState(props.success);
  return (
    <button className='dark' disabled={success} onClick={follow(props.book, setSuccess)}>
      {!success ? 'Follow' : 'Followed successfully'}
    </button>
  )
}

export default FollowBookButton;
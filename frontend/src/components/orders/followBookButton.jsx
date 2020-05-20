import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';

const follow = (book, setSuccess) => () => {
  setSuccess(true);
  fetch(api.subscription(), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ bookId: book.id }),
  })
    .then((res) => {
      if (!res.ok) {
        setSuccess(false);
      }
    });
};

const unfollow = (book, setSuccess) => () => {
  setSuccess(true);
  fetch(api.subscription(), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    credentials: 'include',
    body: JSON.stringify({ bookId: book.id }),
  })
    .then((res) => {
      if (!res.ok) {
        setSuccess(false);
      }
    });
};


const doAction = (sucess) => {
  if (!sucess) {
    return follow;
  }
  return unfollow;
};

const FollowBookButton = (props) => {
  const { data, status } = useFetch(api.subscription());
  const beginState = data ? data.some((sub) => (sub.bookId === props.book.id)) : false;
  const [success, setSuccess] = useState(beginState);
  if (!status) return null;
  return (
    <button className='dark' disabled={success} onClick={doAction(success)(props.book, setSuccess)}>
      {!success ? 'Follow' : 'Unfollow'}
    </button>
  );
};

export default FollowBookButton;

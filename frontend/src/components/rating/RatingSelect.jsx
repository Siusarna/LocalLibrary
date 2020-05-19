/* eslint-disable jsx-a11y/no-onchange */
import React, { useContext } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';
import AuthContext from '../../context/authContext.jsx';

const handleChange = (bookId) => ({ target: { value } }) => {
  if (!value) return;
  fetch(api.rating(), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ rating: value, bookId }),
  });
};

const RatingSelect = ({ bookId }) => {
  const { role } = useContext(AuthContext);
  const { data, isLoaded, status } = useFetch(api.rating(bookId));
  console.dir({ status, data, isLoaded });
  if (role === 'unauthorized') return null;
  if (!status) return null;

  const rating = data ? data.rating : null;

  return (
    <form className='RatingSelect'>
      <img src='/star.png' className='starIcon' alt='rating star' />
      <select onChange={handleChange(bookId)} def>
        {(!rating) && <option value='' selected={true}>-</option>}
        <option value='1' selected={rating === '1'}>1</option>
        <option value='2' selected={rating === '2'}>2</option>
        <option value='3' selected={rating === '3'}>3</option>
        <option value='4' selected={rating === '4'}>4</option>
        <option value='5' selected={rating === '5'}>5</option>
      </select>
    </form>
  );
};

export default RatingSelect;

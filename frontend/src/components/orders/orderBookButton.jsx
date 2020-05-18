import React, { useState } from 'react';
import api from '../../config/api.jsx';


const order = (book, setSuccess) => () => {
  fetch(api.orders.create(), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ bookId: book.id }),
  })
    .then((res) => {
      if (res.ok) {
        setSuccess(true);
      }
    });
};

const OrderBookButton = (props) => {
  const [success, setSuccess] = useState(props.success);
  return (
    <button className='dark' disabled={success} onClick={order(props.book, setSuccess)}>
      {!success ? 'Order' : 'Ordered successfully'}
    </button>
  );
};

export default OrderBookButton;

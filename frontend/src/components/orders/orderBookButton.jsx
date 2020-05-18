import React, { useState } from 'react';


const order = (book, setSuccess) => () => {
  fetch('https://fathomless-ravine-92681.herokuapp.com/api/orders/create', {
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

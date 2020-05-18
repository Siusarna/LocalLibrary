import React, { useState } from 'react';
import api from '../../config/api.jsx';


const confirm = (id, setSuccess) => () => {
  fetch(api.orders.finish(), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      orderId: id,
    }),
  })
    .then((res) => {
      if (res.ok) {
        setSuccess(true);
      }
    });
};

const FinnishOrderButton = (props) => {
  const [success, setSuccess] = useState(props.success);
  if (success) props.onSuccess();
  return (
    <button className='dark' disabled={success} onClick={confirm(props.id, setSuccess)}>
     Finish
    </button>
  );
};

export default FinnishOrderButton;

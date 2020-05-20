import React, { useState } from 'react';
import api from '../../config/api.jsx';


const confirm = (id, setSuccess) => () => {
  fetch(api.orders.confirm(), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({
      comment: '',
      confirmation: 'true',
      orderId: id,
    }),
  })
    .then((res) => {
      if (res.ok) {
        setSuccess(true);
      }
    });
};

const ConfirmOrderButton = (props) => {
  const [success, setSuccess] = useState(props.success);
  if (success) props.onSuccess();
  return (
    <button className='dark' disabled={success} onClick={confirm(props.id, setSuccess)}>
     Confirm
    </button>
  );
};

export default ConfirmOrderButton;

import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

const confirm = (id, setSuccess) => () => {
  fetch('https://fathomless-ravine-92681.herokuapp.com/api/orders/confirmationCode', {
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

const ConfirmationCodeButton = (props) => {
  const [success, setSuccess] = useState(props.success);
  if (success) return <Redirect to={`/orders/ccode/${props.id}`}/>;
  return (
    <button className='dark' disabled={success} onClick={confirm(props.id, setSuccess)}>
     Confirm
    </button>
  );
};

export default ConfirmationCodeButton;

import React from 'react';

const OrderStatusButton = (props) => {
  const { status, curStatus } = props;
  return (
    <button className='dark' onClick={() => props.onClick(status)} disabled={status === curStatus}>
      {status}
    </button>
  )
}

export default OrderStatusButton;
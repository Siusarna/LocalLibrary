import React from 'react';
import OrderList from '../components/orderList';

const checkReturnDate = (returnAt) => {
  const [date, month, year] = returnAt.split('.');
  const returnDate = new Date(+year, +month, +date);
  return new Date() > returnDate;
}

const Status = (props) => {
  let { status, returnAt } = props;
  if (status === 'Loaned' && !checkReturnDate(returnAt)) {
    status = 'Expired'
  } 
  return (
    <div className='Status'>
      <div className={status}>
        {status}
      </div>
    </div>
  )
}

export default Status;
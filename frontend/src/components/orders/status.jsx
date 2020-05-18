import React from 'react';

const checkReturnDate = (returnAt) => {
  const [date, month, year] = returnAt.split(/[. :]/g);
  const returnDate = new Date(+year, +month, +date);
  return new Date() > returnDate;
};

const Status = (props) => {
  let { status } = props;
  const { returnAt } = props;

  if (status === 'Loaned' && returnAt && !checkReturnDate(returnAt)) {
    status = 'Expired';
  }
  return (
    <div className='Status'>
      <div className={status}>
        {status}
      </div>
    </div>
  );
};

export default Status;

import React from 'react';
import ImageTextContainer from '../layout/imageTextContainer.jsx';
import LeftRightContainer from '../layout/leftRightContainer.jsx';

const pad2 = (int) => {
  if (int / 10 < 1) return `0${int.toString()}`;
  return int.toString();
};

const formatDate = (date) => {
  if (typeof date === 'string') return date;
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateNum = date.getDate();

  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  const seconds = pad2(date.getSeconds());

  return `${dateNum}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};


const Review = (props) => {
  const { review } = props;
  const authorName = `${review.firstName} ${review.lastName}`;
  return (
    <div className='Review'>
      <ImageTextContainer src={review.photo}>
        <div className='title'>
          <LeftRightContainer
            left={review.title}
            right={review.rating && <>
              <img src='/star.png' className='starIcon' alt='rating star' />
              {review.rating}
            </>}
          />
        </div>
        <div className='author'>
          <LeftRightContainer
            left={authorName}
          />
        </div>
        <p>{review.content}</p>
        <div className='time'>
          <LeftRightContainer
            right={formatDate(new Date(review.createdAt))}
          />
        </div>
      </ImageTextContainer>
    </div>
  );
};


export default Review;

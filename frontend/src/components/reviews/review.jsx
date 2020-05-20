import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import ImageTextContainer from '../layout/imageTextContainer.jsx';
import LeftRightContainer from '../layout/leftRightContainer.jsx';
import AuthContext from '../../context/authContext.jsx';
import api from '../../config/api.jsx';

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

const deleteReview = (id, setDeleted, setHaveUserReview) => () => {
  // eslint-disable-next-line no-alert
  const isConfirmed = window.confirm('Do you really want to delete this review ?');
  if (isConfirmed) {
    fetch(api.reviews(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 200) {
        setDeleted(true);
        setHaveUserReview(false);
      }
    });
  }
};

const Review = (props) => {
  const { review, setHaveUserReview } = props;
  const { photo, role } = useContext(AuthContext);
  const [isDeleted, setDeleted] = useState(false);

  if (isDeleted) return null;
  if (photo === review.photo) setHaveUserReview(true);

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
            left={
              <LeftRightContainer
                left={
                  ((role === 'librarian')
                    || (photo === review.photo))
                  && <button
                    className='linkBox'
                    onClick={deleteReview(review.id, setDeleted, setHaveUserReview)}
                  >
                    Delete Review
                  </button>
                }
                right={photo === review.photo
                  && <Link
                    to={{
                      pathname: '/reviews/update',
                      state: { review, bookId: props.bookId },
                    }}
                  >
                    <div className='linkBox center'>
                      Update Review
                    </div>
                  </Link>
                }
              />
            }
            right={formatDate(new Date(review.createdAt))}
          />
        </div>
      </ImageTextContainer>
    </div>
  );
};


export default Review;

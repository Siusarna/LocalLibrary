import React from 'react';
import Review from './review.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';

const ReviewsList = (props) => {
  const { bookId } = props;
  const { data: reviews, isLoaded } = useFetch(api.review(bookId));
  if (!isLoaded) return null;

  return (
    <div className='ReviewsList'>
      <SectionTitle text='Reviews'/>
      {reviews.map((review, i) => <Review review={review} key={i}/>)}
    </div>
  );
};

export default ReviewsList;

import React, { useContext, useState } from 'react';
import Review from './review.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import AuthContext from '../../context/authContext.jsx';

const ReviewsList = (props) => {
  const { role } = useContext(AuthContext);
  const [doHaveUserReview, setHaveUserReview] = useState(false);
  const { bookId } = props;
  const { data: reviews, isLoaded } = useFetch(api.reviews(bookId));
  if (!isLoaded) return null;

  return (
    <div className='ReviewsList'>
      {role !== 'unauthorized'
      && (!doHaveUserReview)
      && <SectionTitle className='center' text='Create review' to={`/reviews/${bookId}/add`}/>}
      <SectionTitle className='center' text='Reviews'/>
      {reviews.map((review, i) => <Review review={review} key={i} bookId={bookId} setHaveUserReview={setHaveUserReview}/>)}
    </div>
  );
};

export default ReviewsList;

import React, { useContext, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ImageTextContainer from '../layout/imageTextContainer.jsx';
import LeftRightContainer from '../layout/leftRightContainer.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import AuthContext from '../../context/authContext.jsx';

import OrderBookButton from '../orders/orderBookButton.jsx';
import FollowBookButton from '../orders/followBookButton.jsx';

const deleteBook = (id, setRedirect) => () => {
  // eslint-disable-next-line no-alert
  const isConfirmed = window.confirm('Do you really want to delete this book ?');
  if (isConfirmed) {
    fetch('https://fathomless-ravine-92681.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 200) {
        setRedirect(true);
      }
    });
  }
};


const BookInfo = () => {
  const SAMPLE_COVER = 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg';
  const [isRedirect, setRedirect] = useState(false);
  const { role } = useContext(AuthContext);
  const { id } = useParams();

  const { data: book, isLoaded: isBookLoaded } = useFetch(`https://fathomless-ravine-92681.herokuapp.com/api/books/${id}`);
  const { data: orders, isLoaded: isOrderLoaded } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/orders');

  if (!isBookLoaded || !isOrderLoaded) return null;
  if (isRedirect) return <Redirect to='/books/all' />;

  const isOrdered = orders
    .some((order) => order.bookId === book.id && order.status !== 'Cancel' && order.status !== 'Finished');

  const authorName = `${book.firstName} ${book.lastName}`;

  return (
    <div className='BookInfo'>
      <ImageTextContainer src={book.photo || SAMPLE_COVER}>
        <div className='title'>
          <LeftRightContainer
            left={book.title}
            right={book.rating && <>
              <img src='/star.png' className='starIcon' alt='rating star'/>
              {book.rating}
            </>}
          />
        </div>
        <SectionTitle to={`/authors/${book.authorId}`} text={authorName} />
        <p>{`ISBN: ${book.isbn}`}</p>
        <p>{`Published in: ${book.yearOfPublishing}`}</p>
        <p>{book.description}</p>
      </ImageTextContainer>
      {role === 'librarian' && <button className='dark' onClick={deleteBook(id, setRedirect)}>Delete Book</button>}
      {role === 'librarian' && <SectionTitle text='Update Book' className='center' to={`/books/${id}/update`} />}
      {role === 'customer' && (book.available
        ? (!isOrdered && <OrderBookButton book={book} />)
        : <FollowBookButton book={book} />
      )}
    </div>
  );
};

export default BookInfo;

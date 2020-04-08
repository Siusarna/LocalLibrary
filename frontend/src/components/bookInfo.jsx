import React, { useContext } from 'react';
import ImageTextContainer from './imageTextContainer';
import LeftRightContainer from './leftRightContainer';
import SectionTitle from './sectionTitle';
import useFetch from '../hooks/useFetch';
import AuthContext from '../context/authContext';
import { useParams, Redirect } from 'react-router-dom';
import { useState } from 'react';

const deleteBook = (id, setRedirect) => () => {
  const isConfirmed = window.confirm('Do you really want to delete this book ?');
  if (isConfirmed) {
    fetch('https://fathomless-ravine-92681.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then(res => {
      if (res.status === 200) {
        setRedirect(true);
      }
    })
  }
}


const BookInfo = (props) => {
  const SAMPLE_COVER = 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg';
  const [isRedirect, setRedirect] = useState(false);
  const { role } = useContext(AuthContext);
  const { id } = useParams();
  const { data: book, isLoaded } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/books/' + id);
  if (!isLoaded) return true;
  if (isRedirect) return <Redirect to='/books/all'/>
  const authorName = book.firstName + ' ' + book.lastName;

  const orderBook = () => {};
  const followBook = () => {};

  return (
    <div className='BookInfo'>
      <ImageTextContainer src={book.photo || SAMPLE_COVER}>
        <div className='title'>
          <LeftRightContainer
            left={book.title}
            right={book.rating && <>
              <img src='/star.png' className='starIcon' />
              {book.rating}
            </>}
          />
        </div>
        <SectionTitle to={'/authors/' + book.authorId} text={authorName}/>
        <p>{'ISBN: ' + book.isbn}</p>
        <p>{'Published in: ' + book.yearOfPublishing}</p>
        <p>{book.description}</p>
      </ImageTextContainer>
      {role === 'librarian' && <button className='dark' onClick={deleteBook(id, setRedirect)}>Delete Book</button>}
      {role === 'librarian' && <SectionTitle text='Update Book' className='center' to={'/books/' + id + '/update'}/>}
      <button className='dark' onClick={book.availible ? orderBook : followBook}>
        {book.availible ? ('Order for ' + book.availibleTime) : 'Follow'}
      </button>
    </div>
  )
}

export default BookInfo;
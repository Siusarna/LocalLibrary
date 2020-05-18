import React from 'react';
import { useParams } from 'react-router-dom';
import BookInfo from '../components/books/bookInfo.jsx';


const BookPage = () => {
  const { id } = useParams();
  return (
    <>
      <BookInfo id={id}/>
    </>
  );
};

export default BookPage;

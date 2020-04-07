import React from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/sectionTitle';
import ImageTextContainer from '../components/imageTextContainer';
import LeftRightContainer from '../components/leftRightContainer';
import BookInfo from '../components/bookInfo';


const BookPage = () => {
  const { id } = useParams();
  return (
    <>
      <BookInfo id={id}/>
    </>
  )
}

export default BookPage;
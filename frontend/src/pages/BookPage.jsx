import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import SectionTitle from '../components/sectionTitle';
import ImageTextContainer from '../components/imageTextContainer';
import LeftRightContainer from '../components/leftRightContainer';
import BookInfo from '../components/bookInfo';


const BookPage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <BookInfo id={id}/>
    </>
  )
}

export default BookPage;
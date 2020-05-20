import React from 'react';
import { useParams } from 'react-router-dom';
import NewsInfo from '../components/news/newsInfo.jsx';


const NewsPage = () => {
  const { id } = useParams();
  return (
    <>
      <NewsInfo id={id}/>
    </>
  );
};

export default NewsPage;

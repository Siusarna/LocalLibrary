import React from 'react';
import SectionTitle from '../layout/sectionTitle.jsx';
import News from './news.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';

const NewsList = () => {
  const { isLoaded, data: news } = useFetch(api.news());
  if (!isLoaded) return null;
  return (
    <>
      <SectionTitle to='/news/all' text='News' />
      <div className='NewsList'>
        {news.slice(0, 3).map((item, id) => <News news={item} key={id} />)}
      </div>
    </>
  );
};

export default NewsList;

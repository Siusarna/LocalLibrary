import React from 'react';
import SectionTitle from './sectionTitle';
import News from './news';

// Fake data
// Must be replaced with request on server
const news = ['3', '2', '1'];

const NewsList = () => {
  return (
    <>
      <SectionTitle to='/news' text='News' />
      <div className='NewsList'>
        {news.map((id) => <News id={id} />)}
      </div>
    </>
  )
}

export default NewsList;
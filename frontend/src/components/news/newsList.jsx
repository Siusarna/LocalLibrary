import React from 'react';
import SectionTitle from '../layout/sectionTitle.jsx';
import News from './news.jsx';

// Fake data
// Must be replaced with request on server
const news = ['3', '2', '1'];

const NewsList = () => (
    <>
      <SectionTitle to='/news' text='News' />
      <div className='NewsList'>
        {news.map((id) => <News id={id} key={id}/>)}
      </div>
    </>
);

export default NewsList;

import React from 'react';
import LeftRightContainer from '../layout/leftRightContainer.jsx';

// Fake data
// Must be replaced with request on server
const sampleNews = {
  1: {
    title: 'Filler 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
      + 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'
      + 'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
      + 'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia'
      + 'deserunt mollit anim id est laborum.',
    timeOfPublishing: '03.04.2020 20:14',
  },
  2: {
    title: 'Filler 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
      + 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'
      + 'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
      + 'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia'
      + 'deserunt mollit anim id est laborum.',
    timeOfPublishing: '04.04.2020 21:22',
  },
  3: {
    title: 'Filler 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
      + 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'
      + 'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'
      + 'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia'
      + 'deserunt mollit anim id est laborum.',
    timeOfPublishing: '04.04.2020 22:00',
  },
};

const News = (props) => {
  const news = sampleNews[props.id];
  return (
    <div className='News'>
      <LeftRightContainer
        left={news.title}
        right={news.timeOfPublishing}
      />
      <div className='content'>
        <p>{news.content}</p>
      </div>
    </div>
  );
};

export default News;

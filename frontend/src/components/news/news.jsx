import React from 'react';
import ImageTextContainer from '../layout/imageTextContainer.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';

const News = (props) => {
  const { news } = props;
  return (
    <div className='News'>
      <ImageTextContainer src={news.photo}>
        <div className='NewsInfo'>
          <SectionTitle text={news.header} to={`news/${news.id}`}/>
          <p className='content'>
            {news.shortDescription}
          </p>
        </div>
      </ImageTextContainer>
    </div>
  );
};

export default News;

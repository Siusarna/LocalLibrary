import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ImageTextContainer from '../layout/imageTextContainer.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';
import AuthContext from '../../context/authContext.jsx';

const pad2 = (int) => {
  if (int / 10 < 1) return `0${int.toString()}`;
  return int.toString();
};

const formatDate = (date) => {
  if (typeof date === 'string') return date;
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateNum = date.getDate();

  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  const seconds = pad2(date.getSeconds());

  return `${dateNum}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

const deleteNews = (id, setRedirect) => () => {
  // eslint-disable-next-line no-alert
  const isConfirmed = window.confirm('Do you really want to delete this news ?');
  if (isConfirmed) {
    fetch(api.news(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 200) {
        setRedirect(true);
      }
    });
  }
};

const NewsInfo = (props) => {
  const { id } = props;
  const { data: news, isLoaded } = useFetch(api.news(id));
  const { role } = useContext(AuthContext);
  const [isRedirect, setRedirect] = useState(false);

  if (isRedirect) return <Redirect to='/news/all' />;
  if (!isLoaded) return null;

  return (
    <>
      <div className='NewsInfo'>
        <ImageTextContainer src={news.photo}>
          <div className='NewsInfo'>
            <SectionTitle text={news.header} to={`news/${news.id}`} />
            <p>
              {formatDate(new Date(news.createAt))}
            </p>
            <p className='content'>
              {news.description}
            </p>
          </div>
        </ImageTextContainer>
        {role === 'librarian' && <SectionTitle className='center' text='Update' to={`/news/${id}/update`} />}
        {role === 'librarian' && <button className='dark' onClick={deleteNews(id, setRedirect)}>Delete</button>}
      </div>
    </>
  );
};

export default NewsInfo;

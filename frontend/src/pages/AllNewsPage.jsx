import React, { useContext } from 'react';
import News from '../components/news/news.jsx';
import api from '../config/api.jsx';
import useFetch from '../hooks/useFetch.jsx';
import SectionTitle from '../components/layout/sectionTitle.jsx';
import AuthContext from '../context/authContext.jsx';

const AllNewsPage = () => {
  const { role } = useContext(AuthContext);
  const { isLoaded, data: news } = useFetch(api.news());
  if (!isLoaded) return null;
  return (
    <>
      {role === 'librarian' && <SectionTitle text='Add News' to='/news/add' />}
      <div className='NewsList'>
        {news.map((item, id) => <News news={item} key={id} />)}
      </div>
    </>
  );
};

export default AllNewsPage;

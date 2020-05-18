import React from 'react';
import Author from './author';

const AuthorList = (props) => {
  const { authors } = props;
  const rows = [];
  for (let i = 0; i < authors.length; i += 5) {
    rows.push(authors.slice(i, Math.min(i + 5, authors.length)));
  }
  return (
    <div className='AuthorList'>
      {rows.map((row, index) => <div className='authorRow' key={index}>
        {row.map((author, index) => (
          <Author key={index} author={author}/>
        ))}
      </div>)}
    </div>
  )
};

export default AuthorList;

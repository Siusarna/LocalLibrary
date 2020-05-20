import React from 'react';
import Author from './author.jsx';

const AuthorList = (props) => {
  const { authors } = props;
  const rows = [];
  for (let i = 0; i < authors.length; i += 5) {
    rows.push(authors.slice(i, Math.min(i + 5, authors.length)));
  }
  return (
    <div className='AuthorList'>
      {rows.map((row, i) => <div className='authorRow' key={i}>
        {row.map((author, j) => (
          <Author key={j} author={author}/>
        ))}
      </div>)}
    </div>
  );
};

export default AuthorList;

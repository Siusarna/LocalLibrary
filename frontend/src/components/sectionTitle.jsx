import React from 'react';
import { Link } from 'react-router-dom';

const SectionTitle = (props) => {
  if (props.to) {
    return (
      <Link to={props.to}>
        <div className='SectionTitle'>
          <div className='linkBox'>
            {props.text}
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div className='SectionTitle'>
      <div className='container'>
      {props.text}
      </div>
    </div>
  )
}

export default SectionTitle;
import React from 'react';
import { Link } from 'react-router-dom';

const SectionTitle = ({
  to, text, className, ...props
}) => {
  if (to) {
    return (
      <Link to={to}>
        <div className={`SectionTitle ${className}`} {...props}>
          <div className='linkBox'>
            {text}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <div className={`SectionTitle ${className}`} {...props}>
      <div className='container'>
      {text}
      </div>
    </div>
  );
};

export default SectionTitle;

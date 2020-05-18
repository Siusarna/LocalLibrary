import React from 'react';

const LeftRightContainer = (props) => (
  <div className='LeftRightContainer'>
    <div className='left'>
      {props.left}
    </div>
    <div className='right'>
      {props.right}
    </div>
  </div>
)

export default LeftRightContainer;

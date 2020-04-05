import React from 'react';

const ImageTextContainer = (props) => (
  <div className='ImageTextContainer'>
    <img src={props.src}/>
    <div className='content'>
      {props.children}
    </div>
  </div>
)

export default ImageTextContainer;
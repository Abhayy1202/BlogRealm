import React from 'react'
import background from '../../Images/designer.png'
function Logo({width = '100px'}) {
  return (
    <div>
      <img src={`${background}`} alt="Logo" className="h-12 mr-2 rounded-lg" />
    </div>
  );
}

export default Logo
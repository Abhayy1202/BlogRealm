import React from 'react'
import background from "/Designer.png";
function Logo() {
  return (
    <div>
      <img src={`${background}`} alt="Logo" className="h-12 rounded-full" />
    </div>
  );
}

export default Logo
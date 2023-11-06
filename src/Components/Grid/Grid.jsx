import React from "react";
import "./Grid.css";

import addIcon from "../../Images/add.png";
export function Grid({ children }) {
  return (
    <div className='image-grid'>
      {children}

      <div className='add-image'>
        <input type='file' accept='image/*' />
        <img src={addIcon} height='50px' width='50px' alt='' />
        <p>Add Images</p>
      </div>
    </div>
  );
}

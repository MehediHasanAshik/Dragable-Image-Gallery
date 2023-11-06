import React from "react";
import "./NavBar.css";

function NavBar({ onRemove, selectedItems }) {
  const handleDeleteClick = () => {
    if (selectedItems.length > 0) {
      onRemove(); // Call the onRemove function to delete selected items
    } else {
      alert("No files selected for deletion.");
    }
  };

  const handleOnChange = () => {};

  return (
    <>
      <nav className='navbar'>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedItems.length > 0 ? (
            <>
              <input
                style={{ height: "18px", width: "18px", marginRight: "10px" }}
                type='checkbox'
                checked
                onChange={handleOnChange}
              />
              <h3>
                {selectedItems.length}
                {selectedItems.length === 1 ? " File" : " Files"} Selected
              </h3>
            </>
          ) : (
            <h3>Gallery</h3>
          )}
        </div>
        <div>
          {selectedItems.length > 0 && (
            <h4
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleDeleteClick}
            >
              Delete {selectedItems.length === 1 ? " File" : " Files"}
            </h4>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;

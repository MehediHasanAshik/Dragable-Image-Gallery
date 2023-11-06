import React from "react";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./SortablePhoto.css";

export const SortablePhoto = ({
  url,
  index,
  onCheckboxChange,
  selected,
  ...props
}) => {
  const sortable = useSortable({ id: url, animateLayoutChanges });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

  //custom package styles
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const inlineStyles = {
    opacity: props.faded ? "0.2" : "1",
    transformOrigin: "0 0",
    gridRow: index === 0 && "span 2",
    gridColumn: index === 0 && "span 2",
    backgroundImage: `url("${url}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    border: "2px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    position: "relative",
    ...styles
  };

  function animateLayoutChanges(args) {
    const { isSorting, wasSorting } = args;

    if (isSorting || wasSorting) {
      return defaultAnimateLayoutChanges(args);
    }
    return true;
  }

  const handleCheckbox = (e) => {
    e.stopPropagation();

    const { checked } = e.target;
    onCheckboxChange(url, checked); // Inform parent component about the state changed
  };

  return (
    <div
      className='image-container'
      style={inlineStyles}
      {...props}
      {...attributes}
      ref={setNodeRef}
    >
      <div
        style={{
          width: props.index === 0 ? "85%" : "calc(100% - 38px)",
          height: index === 0 ? "100%" : "100%",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 100,
        }}
        {...listeners}
      />
      <div className='overlay'></div>
      <input
        className='checkbox'
        type='checkbox'
        value={url}
        checked={selected}
        onChange={handleCheckbox}
      />
      <img src={url} height='auto' width='100%' alt='' />
    </div>
  );
};

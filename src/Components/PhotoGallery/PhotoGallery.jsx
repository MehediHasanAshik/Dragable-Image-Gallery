import React, { useState } from "react";
import "./PhotoGallery.css";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "../Grid/Grid";
import { SortablePhoto } from "../SortablePhoto/SortablePhoto";
import photos from "../../photos.json";
import NavBar from "../Nav/NavBar";

const UploadGallery = () => {
  const [items, setItems] = useState(photos);
  const [selectedItems, setSelectedItems] = useState([]); //to maintain selected images to delete
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  //Handle CheckBox Change from Parent Component
  const handleCheckboxChange = (url, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, url]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== url));
    }
  };

  //Delete Selected Item Handler
  const removeSelectedItems = () => {
    const remainingItems = items.filter(
      (item) => !selectedItems.includes(item)
    );
    setItems(remainingItems);
    setSelectedItems([]);
  };

  // I have used an external package to drag the image and sort inside the Grid
  // "dnd-kit" for react is used

  return (
    <div className='container'>
      <>
        {/* pass the selected items and removeHandle Method as props */}
        <NavBar onRemove={removeSelectedItems} selectedItems={selectedItems} />
      </>
      <>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          measuring={measuringConfig}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <Grid>
              {items.map((url, index) => (
                <SortablePhoto
                  key={url}
                  url={url}
                  index={index}
                  onCheckboxChange={handleCheckboxChange}
                  selected={selectedItems.includes(url)}
                />
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay adjustScale={true}>
            {activeId ? (
              <SortablePhoto url={activeId} index={items.indexOf(activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </>
    </div>
  );
};

export default UploadGallery;
